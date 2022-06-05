import React, { useState } from 'react';

// votes= {positiveCount: ..., negativeCount: ...}
// question = {text:..., userName:..., id:...}
// secretWord
const OtherQuestion = ({ yesHandler, noHandler, question, isDisabledOQ }) => {
    const [disabled, setDisabled] = useState(false);

    return (
        <div className="RoundSection">
            <div>
                <p>{question.text}<span className="dimmed"> by {question.username}</span></p>
                {
                    question.secretWord !== "" ? `(${question.secretWord})` : null
                }
            </div>
            <div className="VoteWrapper">
                <div className="itemHeader">Votes</div>
                <div className="YNStat">
                    <p>Yes: {question.yes}</p>
                    <p>No: {question.no}</p>
                </div>
            </div>
            <button
                    className='button-4'
                    disabled={disabled || isDisabledOQ}
                    onClick={() => { yesHandler(); setDisabled(true) }}>Yes</button>
            <button
                    className='button-4'
                    disabled={disabled || isDisabledOQ}
                    onClick={() => { noHandler(); setDisabled(true) }}>No</button>
        </div>
    )
};

export default OtherQuestion;
