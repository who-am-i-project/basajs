export class Question {
    constructor(text, userId) {
        this.text = text;
        this.userId = userId;
        this.positive = 0;
        this.negative = 0;
    }
}