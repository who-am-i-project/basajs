import React, {useState} from "react";

const Form = ({itemAdder, inputType}) => {
    const [inputValue, setNewInputValue] = useState('');

    return (
        <div>
            <input 
                value={inputValue} 
                type='text' 
                onChange={event => setNewInputValue(event.target.value)}
                placeholder={`Enter your ${inputType}`}>
            </input>
            <button onClick={_ => itemAdder({inputValue, setNewInputValue})}>Post a {inputType}</button>
        </div>
    )
}

export default Form;