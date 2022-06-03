export class Room {
    constructor(id, users) {
        this.id = id;
        this.users = [];
        users.forEach(u => {
            this.users.push(u);
        });
        this.state = 0;
    }

    isEnd() {
        return this.users.every(u => {
            return u.hp == 0 || u.won;
        });
    }
}