import React, { useState } from "react";

import Game from "./Game.jsx";
import Login from "./Login.jsx";
import WaitingLobby from "./WaitingLobby.jsx";
import MultiplayerContext from "./MultiplayerContext.jsx";


const Multiplayer = ({ socket }) => {
    const [isInGameRoom, setIsInGameRoom] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    return (
        <MultiplayerContext.Provider value={{
            isInGameRoom,
            setIsInGameRoom,
            isWaiting,
            setIsWaiting
        }}>
            {!isInGameRoom && !isWaiting && <Login socket={socket} />}
            {!isInGameRoom && isWaiting && <WaitingLobby />}
            {isInGameRoom && <Game />}
        </MultiplayerContext.Provider>
    );
};

export default Multiplayer;