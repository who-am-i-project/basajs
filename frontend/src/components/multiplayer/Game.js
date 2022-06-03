import React, {useState} from 'react';
import UserSpace from './UserSpace'

const Game = ({socket}) => {
    const [allQuestions, setAllQuestions] = useState([]);
    const [allGuesses, setAllGuesses] = useState([]);
    const [inputType, setInputType] = useState({ type: '' })

    const addNewItem = ({ inputValue, setNewInputValue }) => {
        if (inputValue) {
            // todo: add user field
            const newUserInput = {
                id: Date.now(),
                body: inputValue,
                inputType: inputType.type,
            }

            if (inputType.type === 'Question') {
                setAllQuestions([...allQuestions, newUserInput]);
            } else {
                setAllGuesses([...allGuesses, newUserInput]);
            }
            setNewInputValue('');
            setInputType({ type: '' });
        }
    }

    return (
        <div className="Content">
            <UserSpace 
                lists={{questions: allQuestions, guesses: allGuesses}}
                itemAdder={addNewItem} 
                inputProps={{type: inputType.type, typeSetter: setInputType}}/>
        </div>
    )
}

export default Game;
