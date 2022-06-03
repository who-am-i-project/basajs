import React from "react";

const MultiplayerContext = React.createContext({
    isInGameRoom: false,
    setIsInGameRoom: () => { },
    isWaiting: false,
    setIsWaiting: () => { },
});

export default MultiplayerContext;
