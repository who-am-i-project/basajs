import React, { useContext, useEffect, useState } from 'react';
import Form from './Form';
import UserSpace from './UserSpace';
import ChatSpace from './ChatSpace';
import MultiplayerContext from './MultiplayerContext';
import Timer from './Timer';
import '../../styles/Game.css';

const Game = ({ socket }) => {
    const [personalQuestions, setPersonalQuestions] = useState([]);
    const [personalGuesses, setPersonalGuesses] = useState([]);
    const [phase, setPhase] = useState('null');
    const [otherQuestions, setOtherQuestions] = useState([]);
    const [hp, setHP] = useState(10);
    const [phaseEndDate, setPhaseEndDate] = useState(new Date());
    const [isFormEnabled, setIsFormEnabled] = useState(false);
    const [outOfGame, setOutOfGame] = useState(false);

    const { setSocketConfiguredForGame, socketConfiguredForGame, roomFull, setResults } = useContext(MultiplayerContext);

    const setSocketListeners = () => {
        socket.on('inputState', () => {
            setOtherQuestions([]);
            let newDate = new Date();
            newDate.setTime(newDate.getTime() + 30 * Math.pow(10, 3));
            setPhaseEndDate(() => newDate);
            setPhase("input");
            setIsFormEnabled(true);
        });
        socket.on('voteState', () => {
            let newDate = new Date();
            newDate.setTime(newDate.getTime() + 30 * Math.pow(10, 3));
            setPhaseEndDate(() => newDate);
            setPhase("vote");
            setIsFormEnabled(false);
        });
        socket.on('otherQuestion', (question) => {
            let questionWithVotes = { ...question, yes: 0, no: 0 };
            if (socket.id === question.userId) {
                setPersonalQuestions((prevPersonalQuestions) => [...prevPersonalQuestions, questionWithVotes]);
            } else {
                setOtherQuestions((prevOtherQuestions) => [...prevOtherQuestions, questionWithVotes]);
            }
        });
        socket.on('guessResult', ({ correct, hp, text }) => {
            if (correct || hp <= 0) {
                setOutOfGame(true);
            }
            setHP(hp);
            setPersonalGuesses((prevPersonalGuesses) => [...prevPersonalGuesses, { correct, text }]);
        });
        socket.on('otherVote', (vote) => {
            const setQuestions = (prevQuestions) => {
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
        socket.on("endState", ({ roomId, statistics }) => {
            socket.emit("leaveRoom", roomId);
            setResults(statistics);
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

    const inputClickHandler = (emit, fieldValue, setFieldValue) => {
        if (fieldValue) {
            socket.emit(emit, fieldValue);
            setFieldValue('');
            setIsFormEnabled(false);
        }
    }

    if (socketConfiguredForGame && roomFull) {
        return (
            <div className="Content">
                <div className="GameInfoContainer">
                    <div className="HPSection">HP: {hp}</div>
                    <Timer targetDate={phaseEndDate} phase={phase} />
                </div>

                <div className="GameContainer">
                    <div className="UserSpaceWrapper">
                        <Form
                            isEnabled={isFormEnabled && !outOfGame}
                            postQuestionHandler={inputClickHandler.bind(null, "question")}
                            guessHandler={inputClickHandler.bind(null, "guess")}
                        />

                        <UserSpace
                            personalQuestions={personalQuestions}
                            personalGuesses={personalGuesses}
                            isEnabled={true}
                        />
                    </div>
                    <ChatSpace isEnabled={phase === 'vote'} otherQuestions={otherQuestions} socket={socket} />
                </div>
            </div>
        );
    }
}

export default Game;
