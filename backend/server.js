import express from 'express';
import { Server } from "socket.io";
import { createServer } from 'http';

import { addUser, getUser, removeUser } from "./manager.js";

const port = 8000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

let waitingUsers = []
let curGameRoomId = 0
const roomCapacity = 3

io.on("connection", (socket) => {
    console.log('user connected');

    socket.on("joinGame", ({ username }) => {
        if (waitingUsers.some(user => user.id === socket.id)) {
            return;
        }

        let curUser = addUser(socket.id, username);
        console.log(`user: id = ${curUser.id}`);
        // all users join general room
        socket.join(`gameRoom${curGameRoomId}`);
        waitingUsers.push(curUser)

        if (waitingUsers.length >= roomCapacity) {
            waitingUsers.forEach((user) => {
                io.to(user.id).emit("gameJoined");
            });
            waitingUsers = []
        }

        // // display only to joined user
        // socket.emit("message", {
        //     userId: curUser.id,
        //     username: curUser.username,
        //     text: `Welcome ${curUser.username}`,
        // });

        // // displays a message to all other room users except joined user
        // socket.broadcast.to('general').emit("message", {
        //     userId: curUser.id,
        //     username: curUser.username,
        //     text: `${curUser.username} has joined the game`,
        // });
    });

    //user sending question
    socket.on("chat", (text) => {
        //gets the user and the message sent
        let curUser = getUser(socket.id);
        io.to('general').emit("message", {
            userId: curUser.id,
            username: curUser.username,
            text: text,
        });
    });

    socket.on("leaveGame", () => {
        let curUser = removeUser(socket.id);
        if (curUser) {
            io.to('general').emit("message", {
                userId: curUser.id,
                username: curUser.username,
                text: `${curUser.username} has left the game`,
            });
        }
    });
});

httpServer.listen(port, () => {
    console.log(`Server is running on the port no: ${(port)}`);
});