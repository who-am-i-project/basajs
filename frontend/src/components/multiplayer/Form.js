import React, {useState} from "react";

const Form = ({itemAdder, inputType}) => {
    const [inputValue, setNewInputValue] = useState('');

    return (
        <div className="FormCenterer">
            <input 
                className="form__input2"
                value={inputValue} 
                type='text' 
                onChange={event => setNewInputValue(event.target.value)}
                placeholder={`Enter your ${inputType}`}>
            </input>
            <button className="button-4" id="submit_btn" onClick={_ => itemAdder({inputValue, setNewInputValue})}>Post a {inputType}</button>
        </div>
    )
}

export default Form;
