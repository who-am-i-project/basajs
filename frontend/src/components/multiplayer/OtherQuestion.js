import React from 'react';

// votes= {positiveCount: ..., negativeCount: ...}
// question = {text:..., userName:..., id:...}
// secretWord
const OtherQuestion = ({yesHandler, noHandler, question}) => {
    return (
        <div>
            <div>
                <p>{question.text}</p>
                <p>By {question.username}</p>
                {
                    question.secretWord !== "" ? `(${question.secretWord})` : null
                }
            </div>
            <div>
                <h3>Votes</h3>
                <p>Yes: {question.yes}</p>
                <p>No: {question.no}</p>
            </div>
            <button className='button-3' onClick={yesHandler}>Yes</button>
            <button className='button-3' onClick={noHandler}>No</button>
        </div>
    )
};

export default OtherQuestion;
