import { useContext } from "react";

import MultiplayerContext from "./MultiplayerContext";

const Login = ({ socket }) => {
    const { username, setUsername, setIsInLogin, setRoomFull, setNumUsersWaiting } = useContext(MultiplayerContext);

    const joinGame = () => {
        if (username !== "") {
            socket.emit("joinGame", { username });
            setIsInLogin(false);
            setNumUsersWaiting('?');
            socket.on("otherJoined", (joinedUsername, secretWord, curTotalJoined) => {
                setNumUsersWaiting(curTotalJoined);
            });
            socket.on("joined", () => {
                setRoomFull(true);
                socket.off("joined");
                socket.off("otherJoined");
                setNumUsersWaiting(0);
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
