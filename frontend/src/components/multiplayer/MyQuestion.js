import React from 'react';

// votes= {positiveCount: ..., negativeCount: ...}
// question = {text:..., userName:..., id:...}
// secretWord
const MyQuestion = ({question}) => {
    return (
        <div>
            <div>
                <p>{question.text}</p>
            </div>
            <div>
                <h3>Votes</h3>
                <p>Yes: {question.yes}</p>
                <p>No: {question.no}</p>
            </div>
        </div>
    )
};

export default MyQuestion;