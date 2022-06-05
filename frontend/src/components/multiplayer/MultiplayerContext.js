import React from "react";

const MultiplayerContext = React.createContext({
    isInGameRoom: false,
    setIsInGameRoom: () => { },
    isWaiting: false,
    setIsWaiting: () => { },
    roomFull: false,
    setRoomFull: () => { },
    username: '',
    setUsername: () => { },
    numUsersWaiting: 0,
    setNumUsersWaiting: () => { }
});

export default MultiplayerContext;
