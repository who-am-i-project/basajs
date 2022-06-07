import { User } from './user.js';

export class UserSpace {
    static users = [];

    static addUser(id, roomId, username) {
        let curUser = new User(id, roomId, username);
        UserSpace.users.push(curUser);
        return curUser;
    }

    static getUser(id) {
        return UserSpace.users.find((u) => u.id === id);
    }

    static removeUser(id) {
        let idx = UserSpace.users.findIndex((u) => u.id === id);
        if (idx !== -1) {
            return UserSpace.users.splice(idx, 1)[0];
        }
    }
}