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
        <div className="LoginPage">
            <center className="WaitText">Welcome to "Who am I?"</center>
            <div className="Form">
                <input
                    className="FormInput"
                    placeholder="Input your user name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button className="buttonBlueHigher" onClick={joinGame}>Join</button>
            </div>
        </div>
    );
}

export default Login;
