export class User {
    static secretWords = ['apple', 'banana', 'elephant'];

    constructor(id, roomId, username) {
        this.id = id;
        this.roomId = roomId;
        this.username = username;
        this.hp = 10;
        this.won = false;
        this.blocked = false;
        this.secretWord = this.secretWords[Math.floor(Math.random() * this.secretWords.length)];;
    }
}