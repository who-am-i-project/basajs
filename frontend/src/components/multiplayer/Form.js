import React, { useState } from "react";

const Form = ({ postQuestionHandler, guessHandler, isEnabled }) => {
    const [inputValue, setNewInputValue] = useState('');
    return (
        <div className={isEnabled ? "FormContainer" : "Disabler FormContainer"}>
            <input
                disabled={!isEnabled}
                className="FormGuessInput"
                value={inputValue}
                type='text'
                onChange={event => setNewInputValue(event.target.value)}
                placeholder={`Enter your question or guess`} />
            <div className="ButtonRow">
                <button disabled={!isEnabled}
                    className="FormGuessButton"
                    onClick={() => postQuestionHandler(inputValue, setNewInputValue)}>
                    Post a question
                </button>
                <button disabled={!isEnabled}
                    className="FormGuessButton"
                    onClick={() => guessHandler(inputValue, setNewInputValue)}>
                    Guess
                </button>
            </div>
        </div>
    );
}

export default Form;
