import React, { useState } from "react";

import Game from "./Game.js";
import Login from "./Login.js";
import WaitingLobby from "./WaitingLobby.js";
import MultiplayerContext from "./MultiplayerContext.js";


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