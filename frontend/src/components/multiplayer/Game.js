import React, { useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import UserSpace from './UserSpace'
import ChatSpace from './ChatSpace'
import MultiplayerContext from './MultiplayerContext';

const Game = ({ socket }) => {
    const [personalQuestions, setPersonalQuestions] = useState([]);
    const [personalGuesses, setPersonalGuesses] = useState([]);
    const [phase, setPhase] = useState('null');
    const [otherQuestions, setOtherQuestions] = useState([]);
    const [inputType, setInputType] = useState({ type: '' })
    const [hp, setHP] = useState(null);

    const { username } = useContext(MultiplayerContext);

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
            console.log("Got inputState");
            setPhase("input");
        });
        socket.on('voteState', () => {
            console.log("Got voteState");
            setPhase("vote");
        });
        socket.on('otherQuestion', (question) => {
            console.log(`Got otherQuestion`);
            console.log(question);
            let questionWithVotes = { ...question, yes: 0, no: 0 };
            if (username === question.username) {
                setPersonalQuestions([...personalQuestions, questionWithVotes]);
                console.log(`Personal questions:`)
                console.log(personalQuestions);
            } else {
                setOtherQuestions([...otherQuestions, questionWithVotes]);
                console.log(`Other questions:`)
                console.log(otherQuestions);
            }
        });
        socket.on('guessResult', ({ correct, hp, text }) => {
            console.log("Got guessResult");
            setHP(hp);
            setPersonalGuesses([...personalGuesses, { correct, text }]);
        });
        socket.on('otherVote', (vote) => {
            console.log("Got otherVote")
            console.log(`personalQuestions: ${personalQuestions}`);
            console.log(`otherQuestions: ${otherQuestions}`);
            console.log(`personalGuesses: ${personalGuesses}`);
            let question = null;
            if (personalQuestions.length > 0 && vote.questionId === personalQuestions[personalQuestions.length - 1].questionId) {
                let newPersonalQuestions = [...personalQuestions];
                question = newPersonalQuestions[personalQuestions.length - 1];
                if (vote.voteType === 'positive') {
                    question.yes += 1;
                } else {
                    question.no += 1;
                }
                setPersonalGuesses(newPersonalQuestions);
            } else {
                let newOtherQuestions = [...otherQuestions];
                question = newOtherQuestions.find((question) => question.questionId === vote.questionId);
                if (vote.voteType === 'positive') {
                    question.yes += 1;
                } else {
                    question.no += 1;
                }
                setOtherQuestions(newOtherQuestions);
            }
        });
        socket.on("endState", (roomId) => {
            console.log("Got endState");
            socket.emit("leaveRoom", roomId);
        });
    }, []);

    return (
        <div className="Content">
            <UserSpace
                personalQuestions={personalQuestions}
                personalGuesses={personalGuesses}
                isEnabled={phase === 'input'}
                socket={socket}
                itemAdder={addNewItem}
                inputProps={{ type: inputType.type, typeSetter: setInputType }}
            />
            <ChatSpace isEnabled={phase === 'vote'} otherQuestions={otherQuestions} socket={socket} />
            <div className="HPSection">HP: {hp}</div>
        </div>
    );
}

export default Game;
