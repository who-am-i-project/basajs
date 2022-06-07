import express from 'express';
import { Server } from "socket.io";
import { createServer } from 'http';

import { UserSpace } from "./src/user/user_space.js";
import { Lobby } from './src/room/lobby.js';
import { Room } from './src/room/room.js';
import { User } from './src/user/user.js';
import { veryInsensitiveStringComparison } from './src/utils.js'

const port = process.env.PORT || 8000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const lobby = new Lobby();

let roomId = 0;
let questionId = 0;
const roomCapacity = 3;

const rooms = [];
User.loadSecretWords();

if (process.env.NODE_ENV === "production") {
    app.use(express.static('frontend/build'));
    app.get("*", (req, res) => {
        req.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'))
    })
}

io.on("connection", (socket) => {
    console.log('user connected');

    socket.on("joinGame", ({ username }) => {
        if (lobby.isJoined(socket.id)) {
            return;
        }

        let curUser = UserSpace.addUser(socket.id, `gameRoom${roomId}`, username);
        console.log(`user: id = ${curUser.id}`);
        socket.join(`gameRoom${roomId}`);
        lobby.join(curUser.id);

        const curTotalJoined = lobby.size();
        io.to(curUser.roomId).emit("otherJoined", curUser.username, curUser.secretWord, curTotalJoined);

        if (lobby.size() >= roomCapacity) {

            let curRoom = new Room(`gameRoom${roomId}`, lobby.users);
            rooms.push(curRoom);

            io.to(curUser.roomId).emit("joined");

            lobby.clear();

            changeState(curRoom.id);

            roomId += 1;
        }
    });

    //user sending question
    socket.on("question", (text) => {
        let curUser = UserSpace.getUser(socket.id);
        io.to(curUser.roomId).emit("otherQuestion", {
            questionId: questionId,
            username: curUser.username,
            userId: curUser.id,
            text: text,
            secretWord: curUser.secretWord
        });
        questionId++;
    });

    //user sending vote
    socket.on("vote", ({ questionId, voteType }) => {
        let curUser = UserSpace.getUser(socket.id);
        console.log(`sending vote: ${questionId}, ${voteType}`);
        io.to(curUser.roomId).emit("otherVote", { questionId, voteType });
    });

    //user sending guess
    socket.on("guess", (text) => {
        let curUser = UserSpace.getUser(socket.id);
        if (veryInsensitiveStringComparison(curUser.secretWord, text)) {
            curUser.won = true;
            socket.emit("guessResult", { correct: true, hp: curUser.hp, text });
        } else {
            curUser.hp--;
            socket.emit("guessResult", { correct: false, hp: curUser.hp, text });
        }
    });

    socket.on("leaveRoom", (roomId) => {
        socket.leave(roomId);
    });

    socket.on("disconnect", () => {
        const removedUser = UserSpace.removeUser(socket.id);
        if (removedUser !== undefined) {
            removedUser.hasDisconnected = true;
            const removedUserFromLobby = lobby.remove(socket.id);
            if (removedUserFromLobby !== undefined) {
                const curTotalWaiting = lobby.size();
                socket.to(removedUser.roomId).emit("otherLeftWaitingRoom", curTotalWaiting);
            }
        }
    });
});

httpServer.listen(port, () => {
    console.log(`Server is running on the port no: ${(port)}`);
});

function changeState(roomId) {
    let curRoom = rooms.find((r) => r.id === roomId);

    let statesFunctions = {
        0: () => {
            io.to(curRoom.id).emit("inputState");
            // use nested setTimeout because: 
            // 1. gives precise delays 
            // 2. diff actions for diff state
            setTimeout(changeState, 30000, roomId);
            curRoom.state = 1;
        },
        1: () => {
            if (curRoom.isEnd()) {
                curRoom.state = 2;
                curRoom.endGame();
                let idx = rooms.findIndex(r => r.id === curRoom.id);
                if (idx !== -1) {
                    rooms.splice(idx, 1);
                }
                io.to(curRoom.id).emit("endState", curRoom.id);
            }
            else {
                io.to(curRoom.id).emit("voteState");
                setTimeout(changeState, 30000, roomId);
                curRoom.state = 0;
            }
        }
    }

    statesFunctions[curRoom.state]();
}