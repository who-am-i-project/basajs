import React from "react";

const MultiplayerContext = React.createContext({
    isInGameRoom: false,
    setIsInGameRoom: () => { },
    isWaiting: false,
    setIsWaiting: () => { },
    username: '',
    setUsername: () => { },
});

export default MultiplayerContext;
