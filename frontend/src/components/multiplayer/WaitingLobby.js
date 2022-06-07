import { useContext } from "react";
import MultiplayerContext from "./MultiplayerContext";

const WaitingLobby = (props) => {
    const { numUsersWaiting } = useContext(MultiplayerContext);
    return (
        <>
            <center className="Center WaitText">
                Waiting...
                <div>
                    {numUsersWaiting}/3
                </div>
            </center>
        </>
    );
}
export default WaitingLobby;
