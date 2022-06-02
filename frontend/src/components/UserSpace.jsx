import React, {useState} from 'react';
import ItemList from './ItemList'
import Form from './Form';

const UserSpace = () => {
    const [questionsList, setUserQuestions] = useState([
        // {id: 1, body: 'Am I alive or not alive object?'},
        // {id: 2, body: 'Am I an mammal or a plant?'},
        // {id: 3, body: 'Do I have black and white skin?'}
    ])
    const [guessesList, setUserGuesses] = useState([])
    const [inputType, setInputType] = useState({type: ''})

    const addNewItem = ({inputValue, setNewInputValue}) => {
        if (inputValue) {
            const newUserInput = {
                id: Date.now(),
                body: inputValue,
                inputType: inputType.type,
            }

            if (inputType.type === 'question') {
                setUserQuestions([...questionsList, newUserInput]);
            } else {
                setUserGuesses([...guessesList, newUserInput]);
            }
            setNewInputValue('');
            setInputType({type: ''});
        }
    }

    const renderForm = () => {
        if (inputType.type.length === 0) {
            return (
                <div>
                    <button onClick={_ => setInputType({type: 'question'})}>Ask a question</button>
                    <button onClick={_ => setInputType({type: 'guess'})}>Guess</button>
                </div>
            )
        } else {
            return (
                <Form itemAdder={addNewItem} inputProps={{inputType: inputType.type}}/>
            )
        }
    }

    return (
        <div>
            {
                renderForm()
            }
            <ItemList list={questionsList} inputType={'questions'}/>
            <hr/>
            <ItemList list={guessesList} inputType={'guesses'}/>
        </div>
    )
}


export default UserSpace;