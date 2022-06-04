import React, { useState } from "react";

const Form = ({ postQuestionHandler, guessHandler, isEnabled }) => {
    const [inputValue, setNewInputValue] = useState('');

    if (isEnabled) {
        return (
            <div className="FormCenterer">
                <input
                    className="form__input2"
                    value={inputValue}
                    type='text'
                    onChange={event => setNewInputValue(event.target.value)}
                    placeholder={`Enter your your question or guess`} />
                <button className="button-4" onClick={() => postQuestionHandler(inputValue, setNewInputValue)}>Post a question</button>
                <button className="button-4" onClick={() => guessHandler(inputValue, setNewInputValue)}>Guess</button>
            </div>
        );
    }
}

export default Form;
