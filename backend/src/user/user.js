import * as fs from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class User {
    static secretWords = []; // ['apple', 'banana', 'elephant'];

    static loadSecretWords() {
        fs.readFile(path.join(__dirname, '../../data/words.json'), 'utf8', (err, jsonData) => {
            if (err) {
                console.error(err);
                return;
            }
            User.secretWords = JSON.parse(jsonData)['words'];
        });
    }

    constructor(id, roomId, username) {
        this.id = id;
        this.roomId = roomId;
        this.username = username;
        this.hp = 10;
        this.won = false;
        this.hasDisconnected = false;
        this.secretWord = User.secretWords[Math.floor(Math.random() * User.secretWords.length)];
    }
}