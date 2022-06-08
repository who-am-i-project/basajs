import React, { useState } from 'react';

const VoteButton = ({ clickHandler, text, numVotes, disabled }) => {
    return (
        <>
            <div className="AnswerCount">{text}: {numVotes}</div>
            <button
                className='AnswerButton'
                disabled={disabled}
                onClick={clickHandler}>{text}</button>
        </>);
};

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
                    <VoteButton disabled={disabled || isDisabledOQ} numVotes={question.yes}
                        clickHandler={() => { yesHandler(); setDisabled(true); }} text="Yes" />

                    <VoteButton disabled={disabled || isDisabledOQ} numVotes={question.no}
                        clickHandler={() => { noHandler(); setDisabled(true); }} text="No" />
                </div>

                <div className="secretWord">{question.secretWord !== "" ? `(${question.secretWord})` : null}</div>
            </div>
        </div>
    );
};

export default OtherQuestion;
