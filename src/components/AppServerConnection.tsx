// import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { initSocketConnection, sendData } from "../global/socket";
import { socketConnection } from "../global/socket";

//Put socket variable in different file so other components can
//access functions as needed like send
//
//Make sure if socket is declared already, it does not get set
// again to prevent multiple connections to the server from being made
//     maybe check socket.active or socket.id

/* Make context for:
- chatlog
- what my player is doing/the plays my player makes??
- the plays other players make
- Anything that will get updated from the server and will affect the game state
*/

function AppServerConnection() {
    const [value, setValue] = useState(0);

    let sc = socketConnection;

    const testSend = () => {
        sendData("test_message", { stage: "prelobby", task: "new_session" });
        console.log("testsend button pressed");
    };

    const connectToServer = () => {
        initSocketConnection();
        // console.log("server connect button pressed");
        setValue(value + 1);
    };

    useEffect(() => {
        sc.on("server_message", (data) => {
            console.log("Message received from server...");
            console.log(data);

            //update the contexts that represent the game state
        });
        // });
    }, [socketConnection]);

    return (
        <div className="App">
            <button onClick={connectToServer}>Connect To Server</button>
            <button onClick={testSend}>TestSend</button>
            <br></br>
        </div>
    );
}

export default AppServerConnection;
