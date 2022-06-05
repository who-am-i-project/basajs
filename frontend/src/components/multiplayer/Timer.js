import React, { useState, useRef } from 'react'

const Timer = ({ targetDate, phase }) => {

    const timerId = useRef(null);
    const targetDateRef = useRef(null);
    targetDateRef.current = targetDate;

    const [timer, setTimer] = useState('00:00');

    const tick = () => {
        const secondsLeft = Math.floor((targetDateRef.current.getTime() - new Date().getTime()) / 1000);
        if (secondsLeft <= 0) {
            setTimer('00:00');
            clearInterval(timerId.current);
            return;
        }
        const minutesLeft = Math.floor(secondsLeft / 60);
        let minutesStr = minutesLeft.toString();
        let secondsStr = (secondsLeft % 60).toString();
        if (minutesStr.length === 1) {
            minutesStr = '0' + minutesStr;
        }
        if (secondsStr.length === 1) {
            secondsStr = '0' + secondsStr;
        }

        setTimer(`${minutesStr}:${secondsStr}`);
    };

    if (targetDate.getTime() > new Date().getTime()) {
        timerId.current = setInterval(tick, 1000);
    }

    return (
        <div>
            <h2>{timer}</h2>
            <div>
                {phase === 'input' ? ' Input phase. Enter your question or guess!' : phase === 'vote' ? 'Vote phase!' : phase}
            </div>

        </div>
    );
}

export default Timer;
