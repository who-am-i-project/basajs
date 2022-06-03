import express from 'express';
import { Server } from "socket.io";
import { createServer } from 'http';

import { addUser, getUser, removeUser } from "./user_manager.js";
import { Lobby } from './lobby.js';
import { Room } from './room.js';

const port = 8000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const lobby = new Lobby();

let roomId = 0;
let questionId = 0;
const roomCapacity = 3;

const rooms = [];

io.on("connection", (socket) => {
    console.log('user connected');

    socket.on("joinGame", ({ username }) => {
        if (lobby.isJoined(socket.id)) {
            return;
        }

        let curUser = addUser(socket.id, `gameRoom${roomId}`, username);
        console.log(`user: id = ${curUser.id}`);
        socket.join(`gameRoom${roomId}`);
        lobby.join(curUser.id);

        socket.to(curUser.roomId).emit("otherJoined", curUser.username, curUser.secretWord);
        socket.emit("joined");

        if (lobby.size() >= roomCapacity) {
            let curRoom = new Room(`gameRoom${roomId}`, lobby.users);
            rooms.push(curRoom);

            lobby.clear();

            changeState(curRoom.id);

            roomId += 1;
        }
    });

    //user sending question
    socket.on("question", (text) => {
        let curUser = getUser(socket.id);
        io.to(curUser.roomId).emit("otherQuestion", {
            questionId: questionId,
            username: curUser.username,
            text: text,
        });
        questionId++;
    });

    //user sending vote
    socket.on("vote", ({ questionId, voteType }) => {
        let curUser = getUser(socket.id);
        io.to(curUser.roomId).emit("otherVote", {
            questionId: questionId,
            voteType: voteType
        });
    });

    //user sending guess
    socket.on("guess", (text) => {
        let curUser = getUser(socket.id);
        if (curUser.secretWord === text) {
            curUser.won = true;
            socket.emit("guessResult", { correct: true, hp: curUser.hp });
        } else {
            curUser.hp--;
            socket.emit("guessResult", { correct: false, hp: curUser.hp });
        }
    });

    socket.on("leaveRoom", (roomId) => {
        socket.leave(roomId);
    });
});

httpServer.listen(port, () => {
    console.log(`Server is running on the port no: ${(port)}`);
});

function changeState(roomId) {
    curRoom = rooms.find((r) => r.id === roomId);

    statesFunctions = {
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
                let idx = rooms.findIndex(r => r.id === curRoom.id);
                if (idx !== -1) {
                    return rooms.splice(idx, 1)[0];
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