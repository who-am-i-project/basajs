import React, {useState, useEffect} from 'react';
import UserSpace from './UserSpace'

const Game = ({socket}) => {
    const [allQuestions, setAllQuestions] = useState([]);
    const [allGuesses, setAllGuesses] = useState([]);
    const [allChatQuestions, setAllChatQuestions] = useState([]);

    const [inputType, setInputType] = useState({ type: '' })

    

    const addNewItem = ({ inputValue, setNewInputValue }) => {
        if (inputValue) {
            // todo: add user field
            const newUserInput = {
                id: Date.now(),
                body: inputValue,
                inputType: inputType.type,
            }
            // console.log(`Adding ${inputValue}, of type ${inputType}}`);
            if (inputType.type === 'question') {
                setAllQuestions([...allQuestions, newUserInput]);
            } else {
                setAllGuesses([...allGuesses, newUserInput]);
            }
            setNewInputValue('');
            setInputType({ type: '' });
        }
    }

    const addNewChatQuestion = (userName, textValue, textType ) => {
        console.log(`Adding ${textValue}, of type ${textType}}`);
            const newChatItem = {
                id: Date.now(),
                name: userName,
                textValue: textValue,
                textType: textType.type,
            }
            // console.log(`Adding ${textValue}, of type ${textType}}`);
            setAllChatQuestions([...allChatQuestions, newChatItem]);
            // setAllGuesses([...allGuesses, newUserInput]);
    }

    socket.on("receive-message", (userName, textType, text) =>{
        // setInputType({ type: textType });
        // console.log("here");
        // console.log(`User ${userName} askefd a ${inputType.type}: ${text}`);
        addNewChatQuestion(userName, text, textType);

    });

    return (
        <div>
            <UserSpace 
                lists={{questions: allQuestions, guesses: allGuesses, chatQuestions:allChatQuestions}}
                itemAdder={addNewItem} 
                inputProps={{type: inputType.type, typeSetter: setInputType}}
                socket={socket}/>
        </div>
    )
}

export default Game;