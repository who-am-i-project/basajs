import React, {useState} from "react";
import { Socket } from "socket.io-client";

const Form = ({itemAdder, inputType}) => {
    const [inputValue, setNewInputValue] = useState('');

    return (
        <div>
            <input
                value={inputValue} 
                type='text' 
                onChange={event => setNewInputValue(event.target.value)}
                placeholder={`Enter your ${inputType}`} />
            <button onClick={() => itemAdder({inputValue, setNewInputValue})}>Post a question</button>
            <button onClick={() => itemAdder({inputValue, setNewInputValue})}>Guess</button>
        </div>
    );
}

export default Form;