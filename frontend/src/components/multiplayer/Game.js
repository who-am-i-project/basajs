import React, { useContext, useEffect, useState } from 'react';
import UserSpace from './UserSpace'
import ChatSpace from './ChatSpace'
import MultiplayerContext from './MultiplayerContext';
import Timer from './Timer'

const Game = ({ socket }) => {
    const [personalQuestions, setPersonalQuestions] = useState([]);
    const [personalGuesses, setPersonalGuesses] = useState([]);
    const [phase, setPhase] = useState('null');
    const [otherQuestions, setOtherQuestions] = useState([]);
    const [inputType, setInputType] = useState({ type: '' })
    const [hp, setHP] = useState(10);
    const [phaseEndDate, setPhaseEndDate] = useState(new Date());

    const { username } = useContext(MultiplayerContext);

    const addNewItem = ({ inputValue, setNewInputValue }) => {
        if (inputValue) {
            if (inputType.type === 'question') {
                socket.emit("question", inputValue);
            } else {
                socket.emit("guess", inputValue);
            }
            setNewInputValue('');
            setInputType({ type: '' });
        }
    }

    const setSockets = () => {
        socket.on('inputState', () => {
            console.log("Got inputState");
            let newDate = new Date();
            newDate.setTime(newDate.getTime() + 30 * Math.pow(10, 3));
            setPhaseEndDate(newDate);
            setPhase("input");
        });
        socket.on('voteState', () => {
            console.log("Got voteState");
            let newDate = new Date();
            newDate.setTime(newDate.getTime() + 30 * Math.pow(10, 3));
            setPhaseEndDate(newDate);
            setPhase("vote");
        });
        socket.on('otherQuestion', (question) => {
            console.log(`Got otherQuestion`);
            console.log(question);
            let questionWithVotes = { ...question, yes: 0, no: 0 };
            if (username === question.username) {
                setPersonalQuestions((prevPersonalQuestions) => [...prevPersonalQuestions, questionWithVotes]);
            } else {
                setOtherQuestions((prevOtherQuestions) => [...prevOtherQuestions, questionWithVotes]);
            }
        });
        socket.on('guessResult', ({ correct, hp, text }) => {
            console.log("Got guessResult");
            setHP(hp);
            setPersonalGuesses((prevPersonalGuesses) => [...prevPersonalGuesses, { correct, text }]);
        });
        socket.on('otherVote', (vote) => {
            console.log("Got otherVote")
            setPersonalQuestions((prevPersonalQuestions) => {
                console.log(`personalQuestions:`);
                console.log(prevPersonalQuestions);
                let newPersonalQuestions = [...prevPersonalQuestions];
                let question = newPersonalQuestions.find((question) => question.questionId === vote.questionId);
                if (question === undefined) {
                    return prevPersonalQuestions;
                }
                if (vote.voteType === 'positive') {
                    question.yes += 1;
                } else {
                    question.no += 1;
                }
                return newPersonalQuestions;
            });
            setOtherQuestions((prevOtherQuestions) => {
                console.log(`otherQuestions:`);
                console.log(prevOtherQuestions);
                let newOtherQuestions = [...prevOtherQuestions];
                let question = newOtherQuestions.find((question) => question.questionId === vote.questionId);
                if (question === undefined) {
                    return prevOtherQuestions;
                }
                if (vote.voteType === 'positive') {
                    question.yes += 1;
                } else {
                    question.no += 1;
                }
                return newOtherQuestions;
            });
        });
        socket.on("endState", (roomId) => {
            console.log("Got endState");
            socket.emit("leaveRoom", roomId);
        });
    }

    useEffect(setSockets, []);

    return (
        <div className="Content">
            <Timer targetDate={phaseEndDate} />
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
