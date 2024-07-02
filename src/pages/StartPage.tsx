// import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { initSocketConnection, sendData, isConnected } from "../global/socket";
import { socketConnection } from "../global/socket";

interface Props {
    username: string;
    setUsername: (item: string) => void;
}

function StartPage({ username, setUsername }: Props) {
    const [rerender, doRerender] = useState(0);

    const [joinSessionID, updateJoinSessionID] = useState("");

    let sc = socketConnection;

    const setNameAndConnectServer = () => {
        if (username.length == 0) {
            alert("Please enter a username.");
            return;
        } else if (username.length > 20) {
            alert("Please enter a shorter username");
            return;
        }
        console.log(username);

        initSocketConnection();
        doRerender(rerender + 1);
    };

    const createSession = () => {
        if (!isConnected()) {
            alert("Please enter and set a username first");
        } else {
            sendData("test_message", {
                stage: "prelobby",
                task: "new_session",
                username: username,
            });
        }
    };

    const joinSession = () => {
        if (!isConnected()) {
            alert("Please enter and set a username first");
        } else if (joinSessionID.length != 4) {
            alert("The provided ID is not the correct length.");
        } else {
            let message_dict = {
                stage: "prelobby",
                task: "join_session",
                session_id: joinSessionID,
                username: username,
            };

            sendData("test_message", message_dict);
        }
    };

    const changeJoinSessionID = (event: { target: { value: any } }) => {
        updateJoinSessionID(event.target.value);
    };

    useEffect(() => {
        sc.on("server_message", (data) => {
            console.log("Message received from server...");
            console.log(data);

            //update the contexts that represent the game state
        });
        // });
    }, [socketConnection]);

    const usernameChange = (event: { target: { value: any } }) => {
        setUsername(event.target.value);
    };

    return (
        <div className="StartPage">
            <input name="username" value={username} onChange={usernameChange} />
            <button onClick={setNameAndConnectServer}>Set Name</button>
            <br />
            <br />

            <button onClick={createSession}>Create Session</button>
            <br />
            <br />
            <input
                name="joinSessionID_input"
                value={joinSessionID}
                onChange={changeJoinSessionID}
            />
            <button onClick={joinSession}>Join Session</button>
        </div>
    );
}

export default StartPage;
