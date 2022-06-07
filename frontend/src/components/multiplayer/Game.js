import React, { useContext, useEffect, useState } from 'react';
import Form from './Form'
import UserSpace from './UserSpace'
import ChatSpace from './ChatSpace'
import MultiplayerContext from './MultiplayerContext';
import Timer from './Timer'
import { useNavigate } from 'react-router-dom';
import '../../styles/Game.css';

const Game = ({ socket }) => {
    const [personalQuestions, setPersonalQuestions] = useState([]);
    const [personalGuesses, setPersonalGuesses] = useState([]);
    const [phase, setPhase] = useState('null');
    const [otherQuestions, setOtherQuestions] = useState([]);
    const [inputType, setInputType] = useState({ type: '' });
    const [hp, setHP] = useState(10);
    const [phaseEndDate, setPhaseEndDate] = useState(new Date());
    const [isFormEnabled, setIsFormEnabled] = useState(false);
    const [outOfGame, setOutOfGame] = useState(false);
    const navigate = useNavigate();

    const { username, setSocketConfiguredForGame, socketConfiguredForGame, roomFull } = useContext(MultiplayerContext);

    const setSocketListeners = () => {
        socket.on('inputState', () => {
            console.log("Got inputState");
            setOtherQuestions([]);
            let newDate = new Date();
            newDate.setTime(newDate.getTime() + 30 * Math.pow(10, 3));
            setPhaseEndDate(() => newDate);
            setPhase("input");
            setIsFormEnabled(true);
        });
        socket.on('voteState', () => {
            console.log("Got voteState");
            let newDate = new Date();
            newDate.setTime(newDate.getTime() + 30 * Math.pow(10, 3));
            setPhaseEndDate(() => newDate);
            setPhase("vote");
            setIsFormEnabled(false);
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
            if (correct || hp <= 0) {
                setOutOfGame(true);
            }
            setHP(hp);
            setPersonalGuesses((prevPersonalGuesses) => [...prevPersonalGuesses, { correct, text }]);
        });
        socket.on('otherVote', (vote) => {
            console.log("Got otherVote")
            const setQuestions = (prevQuestions) => {
                console.log(`questions:`);
                console.log(prevQuestions);
                let newQuestions = [...prevQuestions];
                let question = newQuestions.find((question) => question.questionId === vote.questionId);
                if (question === undefined) {
                    return prevQuestions;
                }
                if (vote.voteType === 'positive') {
                    question.yes += 1;
                } else {
                    question.no += 1;
                }
                return newQuestions;
            };
            setPersonalQuestions(setQuestions);
            setOtherQuestions(setQuestions);
        });
        socket.on("endState", (roomId) => {
            console.log("Got endState");
            socket.emit("leaveRoom", roomId);
            navigate("/");
        });
        setSocketConfiguredForGame(true);
    }

    const resetSocketListeners = () => {
        socket.off('inputState');
        socket.off('voteState');
        socket.off('otherQuestion');
        socket.off('guessResult');
        socket.off('otherVote');
        socket.off('endState');
    }

    useEffect(() => {
        setSocketListeners();
        return () => {
            resetSocketListeners();
            socket.emit("leaveRoom");
        };
    }, []);

    const postQuestionHandler = (fieldValue, setFieldValue) => {
        if (fieldValue) {
            socket.emit("question", fieldValue);
            setFieldValue('');
            setIsFormEnabled(false);
        }
    }

    const guessHandler = (fieldValue, setFieldValue) => {
        if (fieldValue) {
            socket.emit("guess", fieldValue);
            setFieldValue('');
            setIsFormEnabled(false);
        }
    }

    if (socketConfiguredForGame && roomFull) {
        return (
            <div className="Content">
                <Timer targetDate={phaseEndDate} phase={phase} />
                <div className="HPSection">YOUR HP: {hp}</div>
                <Form isEnabled={isFormEnabled && !outOfGame} postQuestionHandler={postQuestionHandler} guessHandler={guessHandler} />
                <div className="Flexer">
                    <UserSpace
                        personalQuestions={personalQuestions}
                        personalGuesses={personalGuesses}
                        isEnabled={true}
                        socket={socket}
                        postQuestionHandler={postQuestionHandler}
                        guessHandler={guessHandler}
                        inputProps={{ type: inputType.type, typeSetter: setInputType }}
                    />
                    <ChatSpace isEnabled={phase === 'vote'} otherQuestions={otherQuestions} socket={socket} />
                </div>
            </div>
        );
    }
}

export default Game;
