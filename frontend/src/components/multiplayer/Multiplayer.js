import React, { useState } from "react";

import Game from "./Game.js";
import Login from "./Login.js";
import WaitingLobby from "./WaitingLobby.js";
import MultiplayerContext from "./MultiplayerContext.js";


const Multiplayer = ({ socket }) => {
    const [isInGameRoom, setIsInGameRoom] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const [username, setUsername] = useState('');
    return (
        <MultiplayerContext.Provider value={{
            isInGameRoom,
            setIsInGameRoom,
            isWaiting,
            setIsWaiting,
            username,
            setUsername
        }}>
            {!isInGameRoom && !isWaiting && <Login socket={socket} />}
            {!isInGameRoom && isWaiting && <WaitingLobby />}
            {isInGameRoom && <Game socket={socket} />}
        </MultiplayerContext.Provider>
    );
};

export default Multiplayer;