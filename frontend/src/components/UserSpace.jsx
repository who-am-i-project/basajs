import React from 'react';
import ItemList from './ItemList'
import Form from './Form';

const UserSpace = ({lists, itemAdder, inputProps }) => {
    // const [questionsList, setUserQuestions] = useState([])
    // const [guessesList, setUserGuesses] = useState([])
    // const [inputType, setInputType] = useState({ type: '' })

    // const addNewItem = ({ inputValue, setNewInputValue }) => {
    //     if (inputValue) {
    //         const newUserInput = {
    //             id: Date.now(),
    //             body: inputValue,
    //             inputType: inputType.type,
    //         }

    //         if (inputType.type === 'question') {
    //             setUserQuestions([...questionsList, newUserInput]);
    //         } else {
    //             setUserGuesses([...guessesList, newUserInput]);
    //         }
    //         setNewInputValue('');
    //         setInputType({ type: '' });
    //     }
    // }

    const renderForm = () => {
        if (inputProps.type.length === 0) {
            return (
                <div>
                    <button onClick={_ => inputProps.typeSetter({ type: 'question' })}>Ask a question</button>
                    <button onClick={_ => inputProps.typeSetter({ type: 'guess' })}>Guess</button>
                </div>
            )
        } else {
            return (
                <Form itemAdder={itemAdder} inputType={inputProps.type} />
            )
        }
    }

    return (
        <div>
            {
                renderForm()
            }
            <ItemList list={lists.questions} inputType={'questions'} />
            <hr />
            <ItemList list={lists.guesses} inputType={'guesses'} />
        </div>
    )
}


export default UserSpace;