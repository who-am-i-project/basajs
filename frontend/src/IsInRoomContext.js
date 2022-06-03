import React from 'react'

const IsInRoomContext = React.createContext({
    isInRoom: false,
    setIsInRoom: () => { }
});

export default IsInRoomContext;