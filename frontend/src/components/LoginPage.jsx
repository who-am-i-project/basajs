import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = ({ socket }) => {
    const [username, setUserName] = useState('');

    const sendUserData = () => {
        if (username !== "") {
            // alert(username);
            socket.emit("joinGame", { username });
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
            <Link to={`/game`}>
                <button onClick={sendUserData}>Join</button>
            </Link>
        </div>
    );
}

export default LoginPage;