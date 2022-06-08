import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import Game from "./Game.js";
import Login from "./Login.js";
import WaitingLobby from "./WaitingLobby.js";
import MultiplayerContext from "./MultiplayerContext.js";


const Multiplayer = () => {
    const [socket, setSocket] = useState();
    const [isInLogin, setIsInLogin] = useState(true);
    const [socketConfiguredForGame, setSocketConfiguredForGame] = useState(false);
    const [roomFull, setRoomFull] = useState(false);
    const [username, setUsername] = useState('');
    const [numUsersWaiting, setNumUsersWaiting] = useState(0);

    useEffect(() => {
        const socket = io('/', {
            transports: ['websocket'],
            path: '/socket',
        });
        setSocket(socket);
        return () => socket.close();
    }, []);

    if (socket !== undefined) {
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
                numUsersWaiting,
                setNumUsersWaiting
            }}>
                {isInLogin && <Login socket={socket} />}
                {!isInLogin && (!socketConfiguredForGame || !roomFull) && <WaitingLobby />}
                {!isInLogin && <Game socket={socket} />}
            </MultiplayerContext.Provider>
        );
    }
};

export default Multiplayer;