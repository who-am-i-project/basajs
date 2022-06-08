import * as fs from 'fs';
import { UserSpace } from '../user/user_space.js';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Room {
    constructor(id, users) {
        this.id = id;
        this.users = [];
        this.playingUsers = [];
        users.forEach(u => {
            this.users.push(u);
            this.playingUsers.push(u);
        });
        this.state = 0;
    }

    isEnd() {
        this.playingUsers = this.playingUsers.filter(u => !u.won && u.hp > 0 && !u.hasDisconnected);
        return this.playingUsers.length <= 1;
    }

    endGame() {
        this.removeUsersFromSpace();
        return this.collectResults();
    }

    collectResults() {
        let results = [];
        this.users.forEach(u => {
            results.push({
                username: u.username,
                won: u.won,
                hp: u.hp,
                hasDisconnected: u.hasDisconnected,
                secretWord: u.secretWord
            });
        });
        return results;
    }

    removeUsersFromSpace() {
        this.users.forEach(u => {
            UserSpace.removeUser(u.id);
        });
    }
}