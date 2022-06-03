import React, {useState} from "react";


const Form = ({itemAdder, inputType,socket}) => {
    const [inputValue, setNewInputValue] = useState('');

    return (
        <div>
            <input 
                value={inputValue} 
                type='text' 
                onChange={event => setNewInputValue(event.target.value)}
                placeholder={`Enter your ${inputType}`}>
            </input>
            <button onClick={_ => {
                itemAdder({inputValue, setNewInputValue});
                
                socket.emit("chat",inputValue,inputType,socket.id);
                // console.log(`(id:${socket.id}) asked ${inputValue}`);
            }

            }>Post a {inputType}</button>
        </div>
    )
}

export default Form;