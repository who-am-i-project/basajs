import React, { useState } from 'react';

// votes= {positiveCount: ..., negativeCount: ...}
// question = {text:..., userName:..., id:...}
// secretWord
const OtherQuestion = ({ yesHandler, noHandler, question, isDisabledOQ }) => {
    const [disabled, setDisabled] = useState(false);

    return (
        <div className="OtherQuestionContainer">
            <div className="OtherQuestionTextWrapper">
                <div>
                    {question.text}
                </div>
                <div className="dimmed"> by {question.username}</div>
            </div>

            <div className="VoteWrapper">

                <div className="AnswerButtonWrapper">
                    <div className="AnswerCount">Yes: {question.yes}</div>
                    <button
                        className='AnswerButton'
                        disabled={disabled || isDisabledOQ}
                        onClick={() => { yesHandler(); setDisabled(true) }}>Yes</button>
                    <div className="AnswerCount">No: {question.no}</div>

                    <button
                        className='AnswerButton'
                        disabled={disabled || isDisabledOQ}
                        onClick={() => { noHandler(); setDisabled(true) }}>No</button>
                </div>

                <div className="secretWord">{question.secretWord !== "" ? `(${question.secretWord})` : null}</div>
                </div>
        </div>
    )
};

export default OtherQuestion;
