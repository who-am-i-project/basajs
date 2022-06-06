import { json } from "express";
import * as fs from 'fs';



export class User {
    static secretWords = []; // ['apple', 'banana', 'elephant'];

    static loadSecretWords() {
        fs.readFile('data/words.json', 'utf8', (err, jsonData) => {
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
        this.blocked = false;
        this.secretWord = User.secretWords[Math.floor(Math.random() * User.secretWords.length)];;
    }
}