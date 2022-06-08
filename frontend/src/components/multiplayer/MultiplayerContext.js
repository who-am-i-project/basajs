import React from "react";

const MultiplayerContext = React.createContext({
    isInLogin: false,
    setIsInLogin: () => { },
    socketConfiguredForGame: false,
    setSocketConfiguredForGame: () => { },
    roomFull: false,
    setRoomFull: () => { },
    username: '',
    setUsername: () => { },
    numUsersWaiting: 0,
    setNumUsersWaiting: () => { }
});

export default MultiplayerContext;
