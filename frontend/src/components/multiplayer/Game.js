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
    const [inputType, setInputType] = useState({ type: '' });
    const [hp, setHP] = useState(10);
    const [phaseEndDate, setPhaseEndDate] = useState(new Date());
    const [isUserSpaceFormEnabled, setIsUserSpaceFormEnabled] = useState(false);

    const { username, setSocketConfiguredForGame, socketConfiguredForGame, roomFull } = useContext(MultiplayerContext);

    const setSockets = () => {
        socket.on('inputState', () => {
            console.log("Got inputState");
            setOtherQuestions([]);
            let newDate = new Date();
            newDate.setTime(newDate.getTime() + 30 * Math.pow(10, 3));
            setPhaseEndDate(() => newDate);
            setPhase("input");
            setIsUserSpaceFormEnabled(true);
        });
        socket.on('voteState', () => {
            console.log("Got voteState");
            let newDate = new Date();
            newDate.setTime(newDate.getTime() + 30 * Math.pow(10, 3));
            setPhaseEndDate(() => newDate);
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
            console.log(`text: ${text}`);
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
        setSocketConfiguredForGame(true);
    }

    useEffect(setSockets, []);

    const postQuestionHandler = (fieldValue, setFieldValue) => {
        if (fieldValue) {
            socket.emit("question", fieldValue);
            setFieldValue('');
            setIsUserSpaceFormEnabled(false);
        }
    }

    const guessHandler = (fieldValue, setFieldValue) => {
        if (fieldValue) {
            socket.emit("guess", fieldValue);
            setFieldValue('');
            setIsUserSpaceFormEnabled(false);
        }
    }

    if (socketConfiguredForGame && roomFull) {
        return (
            <div className="Content">
                <Timer targetDate={phaseEndDate} />
                <div className="HPSection">HP: {hp}</div>
                <UserSpace
                    personalQuestions={personalQuestions}
                    personalGuesses={personalGuesses}
                    isEnabled={phase === 'input'}
                    isFormEnabled={isUserSpaceFormEnabled}
                    socket={socket}
                    postQuestionHandler={postQuestionHandler}
                    guessHandler={guessHandler}
                    inputProps={{ type: inputType.type, typeSetter: setInputType }}
                />
                <ChatSpace isEnabled={phase === 'vote'} otherQuestions={otherQuestions} socket={socket} />
            </div>
        );
    }
}

export default Game;
