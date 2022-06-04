import React, { useState } from "react";

import Game from "./Game.js";
import Login from "./Login.js";
import WaitingLobby from "./WaitingLobby.js";
import MultiplayerContext from "./MultiplayerContext.js";


const Multiplayer = ({ socket }) => {
    const [isInLogin, setIsInLogin] = useState(true);
    const [socketConfiguredForGame, setSocketConfiguredForGame] = useState(false);
    const [roomFull, setRoomFull] = useState(false);
    const [username, setUsername] = useState('');
    return (
        <MultiplayerContext.Provider value={{
            isInLogin,
            setIsInLogin,
            socketConfiguredForGame,
            setSocketConfiguredForGame,
            roomFull,
            setRoomFull,
            username,
            setUsername,
        }}>
            {isInLogin && <Login socket={socket} />}
            {!isInLogin && (!socketConfiguredForGame || !roomFull) && <WaitingLobby />}
            {!isInLogin && <Game socket={socket} />}
        </MultiplayerContext.Provider>
    );
};

export default Multiplayer;