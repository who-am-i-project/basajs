import express from 'express';
import { Server } from "socket.io";
import { createServer } from 'http';

import { addUser, getUser, removeUser } from "./manager.js";

const port = 8000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log('user connected');

    socket.on("joinGame", ({ username }) => {
        let curUser = addUser(socket.id, username);
        console.log(`user: id = ${curUser.id}`);
        // all users join general room
        socket.join('general');

        // display only to joined user
        socket.emit("message", {
            userId: curUser.id,
            username: curUser.username,
            text: `Welcome ${curUser.username}`,
        });

        // displays a message to all other room users except joined user
        socket.broadcast.to('general').emit("message", {
            userId: curUser.id,
            username: curUser.username,
            text: `${curUser.username} has joined the game`,
        });
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

httpServer.listen(port);