import React, { useEffect, useState } from 'react';
import UserSpace from './UserSpace'

const Game = ({ socket }) => {
    const [allQuestions, setAllQuestions] = useState([]);
    const [allGuesses, setAllGuesses] = useState([]);
    const [phase, setPhase] = useState('null');
    const [otherQuestions, setOtherQuestions] = useState([]);

    const addNewItem = ({ inputValue, setNewInputValue }) => {
        if (inputValue) {
            // todo: add user field
            const newUserInput = {
                id: Date.now(),
                body: inputValue,
                inputType: inputType.type,
            }

            if (inputType.type === 'question') {
                setAllQuestions([...allQuestions, newUserInput]);
            } else {
                setAllGuesses([...allGuesses, newUserInput]);
            }
            setNewInputValue('');
            setInputType({ type: '' });
        }
    }

    useEffect(() => {
        socket.on('inputState', () => {
            setPhase("input");
        });
        socket.on('voteState', () => {
            setPhase("vote");
        });
        socket.on('otherQuestions', (newQuestion) => {
            setOtherQuestions({...otherQuestions, newQuestion});
        });
        socket.on('otherVote', (answers) => {
            if (answers.questionId === )
            setAllQuestions(...allQuestions, answers);
        });
        socket.on('guessResult', (correct, hp) => {

        });
    }, []);

    return (
        <div>
            <UserSpace
                questions={allQuestions}
                guesses={allGuesses}
                isEnabled={phase === 'input'}
                socket={socket} />
            <ChatSpace isEnabled={phase === 'vote'} />
        </div>
    )
}

export default Game;