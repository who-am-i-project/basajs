import React from 'react';

// votes= {positiveCount: ..., negativeCount: ...}
// question = {text:..., userName:..., id:...}
// secretWord
const OtherQuestion = ({yesHandler, noHandler, question}) => {
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
            <button className='button-4' onClick={yesHandler}>Yes</button>
            <button className='button-4' onClick={noHandler}>No</button>
        </div>
    )
};

export default OtherQuestion;
