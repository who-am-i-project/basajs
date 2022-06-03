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
                <div className="ButtonsWrapper">
                    <button className="button-3" onClick={_ => inputProps.typeSetter({ type: 'Question' })}>Ask a question</button>
                    <button className="button-3" onClick={_ => inputProps.typeSetter({ type: 'Guess' })}>Guess</button>
                </div>
            )
        } else {
            return (
                <Form itemAdder={itemAdder} inputType={inputProps.type} />
            )
        }
    }

    return (
        <div className="GameInfo">
            {
                renderForm()
            }
            <ItemList list={lists.questions} inputType={'Questions'} />
            <ItemList list={lists.guesses} inputType={'Guesses'} />
        </div>
    )
}


export default UserSpace;
