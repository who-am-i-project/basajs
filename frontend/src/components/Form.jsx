import React, {useState} from "react";

const Form = ({itemAdder, inputProps}) => {
    const [inputValue, setNewInputValue] = useState('');

    return (
        <div>
            <input 
                value={inputValue} 
                type='text' 
                onChange={event => setNewInputValue(event.target.value)}
                placeholder={`Enter your ${inputProps.inputType}`}>
            </input>
            <button onClick={_ => itemAdder({inputValue, setNewInputValue})}>Post a {inputProps.inputType}</button>
        </div>
    )
}

export default Form;