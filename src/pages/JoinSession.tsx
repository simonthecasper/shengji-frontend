import { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../store/store.ts";
import Button from "../components/Button.tsx";

import { C2S_joinSession } from "../socket/C2SMessages.ts";

//  TODO: Wrong alert response to no value entered in input
function JoinSession() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [user, _setUser] = useAtom(userAtom);
    const [joinSessionID, updateJoinSessionID] = useState("");

    const changeJoinSessionID = (event: { target: { value: string } }) => {
        updateJoinSessionID(event.target.value);
    };

    const joinSession = () => {
        if (joinSessionID.length != 6) {
            alert("The provided ID is not the correct length.");
        } else {
            C2S_joinSession(user, joinSessionID);
        }
    };

    return (
        <>
            <div id="joinSessionContainer">
                <input
                    name="joinSessionID_input"
                    className="baseInput"
                    value={joinSessionID}
                    onChange={changeJoinSessionID}
                />
                <Button margin="0 0 0 1rem" bg="primary" onClick={joinSession}>
                    Join Session
                </Button>{" "}
            </div>
        </>
    );
}

export default JoinSession;
