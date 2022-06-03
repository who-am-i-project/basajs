import { addUser, getUser, removeUser } from "./user_manager.js";

export class Lobby {
    constructor() {
        this.users = [];
    }

    join(userId) {
        curUser = getUser(userId);
        this.users.push(curUser);
    }

    isJoined(userId) {
        return this.users.some((user) => user.id === userId);
    }

    size() {
        return this.users.length;
    }

    clear() {
        this.users = [];
    }
}