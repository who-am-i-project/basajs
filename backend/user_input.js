export class UserInput {
    constructor(userId, text, type) {
        this.userId = userId;
        this.text = text;
        this.type = type;
        this.positive = 0;
        this.negative = 0;
    }
}