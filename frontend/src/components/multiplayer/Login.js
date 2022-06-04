import { useContext } from "react";

import MultiplayerContext from "./MultiplayerContext";

const Login = ({ socket }) => {
    const { username, setUsername, setIsInLogin, setRoomFull } = useContext(MultiplayerContext);

    const joinGame = () => {
        if (username !== "") {
            socket.emit("joinGame", { username });
            setIsInLogin(false);
            socket.on("joined", () => {
                setRoomFull(true);
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
                    id="FormInput"
                    className="form__input"
                    placeholder="Input your user name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button id="FormButton" className="button-4" onClick={joinGame}>Join</button>
            </div>
        </div>
    );
}

export default Login;
