export class User {
    constructor(id, roomId, username) {
        this.id = id;
        this.roomId = roomId;
        this.username = username;
        this.hp = 0;
        this.won = false;
        this.blocked = false;
        this.secretWord = '';
    }
}