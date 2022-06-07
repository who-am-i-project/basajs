import { UserSpace } from '.././user/user_space.js';

export class Lobby {
    constructor() {
        this.users = [];
    }

    join(userId) {
        let curUser = UserSpace.getUser(userId);
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

    remove(userId) {
        let idx = this.users.findIndex((u) => u.id === userId);
        if (idx !== -1) {
            return this.users.splice(idx, 1)[0];
        }
    }
}