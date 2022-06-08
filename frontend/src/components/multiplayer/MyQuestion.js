import React from 'react';

const MyQuestion = ({ question }) => {
    return (
        <div className="QuestionBlock">
            <div className="QuestionText">{question.text}</div>
            <div className="Answers">
                <div>Yes: {question.yes}</div>
                <div>No: {question.no}</div>
            </div>
        </div>
    )
};

export default MyQuestion;
