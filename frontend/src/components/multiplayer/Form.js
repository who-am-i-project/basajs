import React, { useState } from "react";

const Form = ({ postQuestionHandler, guessHandler, isEnabled }) => {
    const [inputValue, setNewInputValue] = useState('');
    if (isEnabled) {
        return (
            <div className="FormCenterer">
                <input
                    disabled={!isEnabled}
                    className="FormInputWider"
                    value={inputValue}
                    type='text'
                    onChange={event => setNewInputValue(event.target.value)}
                    placeholder={`Enter your question or guess`} />
                <button disabled={!isEnabled} className="buttonBlueHigher" onClick={() => postQuestionHandler(inputValue, setNewInputValue)}>Post a question</button>
                <button disabled={!isEnabled} className="buttonBlueHigher" onClick={() => guessHandler(inputValue, setNewInputValue)}>Guess</button>
            </div>
        );
    }      
    else {
        return (
            <div className="Disabler FormCenterer">
                <input
                    disabled={!isEnabled}
                    className="FormInputWider"
                    value={inputValue}
                    type='text'
                    onChange={event => setNewInputValue(event.target.value)}
                    placeholder={`Enter your question or guess`} />
                <button disabled={!isEnabled} className="buttonBlueHigher" onClick={() => postQuestionHandler(inputValue, setNewInputValue)}>Post a question</button>
                <button disabled={!isEnabled} className="buttonBlueHigher" onClick={() => guessHandler(inputValue, setNewInputValue)}>Guess</button>
            </div>
        );
    }      
}

export default Form;
