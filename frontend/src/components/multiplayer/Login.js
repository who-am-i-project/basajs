import { useState, useContext } from "react";

import MultiplayerContext from "./MultiplayerContext";

const Login = ({ socket }) => {
    const [username, setUserName] = useState('');
    const { setIsWaiting, setIsInGameRoom } = useContext(MultiplayerContext);

    const joinGame = () => {
        if (username !== "") {
            socket.emit("joinGame", { username });
            setIsWaiting(true);
            socket.on("joined", () => {
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
            <center className="Wait-Text">Welcome to "Who am I?"</center>
            <div className="Form">
                <input
                    className="form__input"
                    placeholder="Input your user name"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <button className="button-4" onClick={joinGame}>Join</button>
            </div>
        </div>
    );
}

export default Login;
