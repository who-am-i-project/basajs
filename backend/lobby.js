import { addUser, getUser, removeUser } from "./user_manager.js";

export class Lobby {
    constructor() {
        this.users = [];
        this.secretWords = ['apple', 'banana', 'elephant'];
        this.initHp = 5;
    }

    join(userId) {
        curUser = getUser(userId);
        this.users.push(curUser);
    }

    isJoined(userId) {
        return users.some((user) => user.id === userId);
    }

    size() {
        return this.users.length;
    }

    clear() {
        this.users = [];
    }

    initPlayers() {
        this.users.forEach((u) => {
            u.secretWord = this.secretWords[Math.floor(Math.random() * this.secretWords.length)];
            u.hp = this.initHp;
        });
    }
}