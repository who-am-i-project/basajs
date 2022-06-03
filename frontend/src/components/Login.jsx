import { useState, useContext } from "react";

import MultiplayerContext from "./MultiplayerContext";

const Login = ({ socket }) => {
    const [username, setUserName] = useState('');
    const { setIsWaiting, setIsInGameRoom } = useContext(MultiplayerContext);

    const joinGame = () => {
        if (username !== "") {
            socket.emit("joinGame", { username });
            setIsWaiting(true);
            socket.on("gameJoined", () => {
                setIsInGameRoom(true);
                setIsWaiting(false);
            });
        } else {
            alert("Enter username!");
            window.location.reload();
        }
    }

    return (
        <div className="login-page">
            <h1>Welcome to "Who am I?"</h1>
            <input
                placeholder="Input your user name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
            />
            <button onClick={joinGame}>Join</button>
        </div>
    );
}

export default Login;
