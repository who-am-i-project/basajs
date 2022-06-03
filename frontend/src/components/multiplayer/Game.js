import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import UserSpace from './UserSpace'

const Game = ({ socket }) => {
    const [personalQuestions, setPersonalQuestions] = useState([]);
    const [personalGuesses, setPersonalGuesses] = useState([]);
    const [phase, setPhase] = useState('null');
    const [otherQuestions, setOtherQuestions] = useState([]);
    const [inputType, setInputType] = useState({ type: '' })
    const [hp, setHP] = useState(null);

    const addNewItem = ({ inputValue, setNewInputValue }) => {
        if (inputValue) {
            // todo: add user field
            const newUserInput = {
                id: Date.now(),
                body: inputValue,
                inputType: inputType.type,
            }

            if (inputType.type === 'question') {
                socket.emit("question", inputValue);
            } else {
                socket.emit("guess", inputValue);
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
        socket.on('otherQuestion', (question) => {
            questionWithVotes = {...question, yes: 0, no: 0};
            if (username === question.username) {
                setPersonalQuestions([...personalQuestions, questionWithVotes]);
            } else {
                setOtherQuestions([...otherQuestions, questionWithVotes]);
            }
        });
        socket.on('guessResult', ({ correct, hp, text }) => {
            setHP(hp);
            setPersonalGuesses([...personalGuesses, { correct, hp, text }]);
        });
        socket.on('otherVote', (vote) => {
            let question = null;
            if (personalQuestions && vote.questionId === personalQuestions[personalGuesses.length - 1].questionId) {
                question = personalQuestions[personalGuesses.length - 1];
            } else {
                question = otherQuestions.find((question) => {question.questionId === vote.questionId});
            }
            if (vote.voteType === 'positive') {
                question.yes += 1;
            } else {
                question.no += 1;
            }
        });
        socket.on("endState", (roomId) => {
            socket.emit("leaveRoom", roomId);
        });
    }, []);

    return (
        <div>
            <UserSpace
                personalQuestions={personalQuestions}
                personalGuesses={personalGuesses}
                isEnabled={phase === 'input'}
                socket={socket}
                itemAdder={addNewItem}
                inputProps={inputType}
            />
            <ChatSpace isEnabled={phase === 'vote'} otherQuestions={otherQuestions} socket={socket} />
            <div>{hp}</div>
        </div>
    );
}

export default Game;