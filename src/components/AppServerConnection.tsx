import { SetStateAction, useState } from "react";
import { io } from "socket.io-client";

function AppServerConnection() {
    const [serverIP, setServerIP] = useState("");
    const [serverPort, setServerPort] = useState(-1);

    const handleServerIPChange = (event: {
        target: { value: SetStateAction<string> };
    }) => {
        let new_value = event.target.value;
        setServerIP(new_value);
    };

    const handleServerPortChange = (event: { target: { value: any } }) => {
        let new_value = event.target.value;
        setServerPort(new_value);
    };

    const connectToServer = () => {
        let socket = io("ws://" + serverIP + ":" + serverPort);

        socket.on("connection", () => {
            console.log("connected");
        });

        socket.on("connection", () => {
            console.log("connected");
        });
    };

    return (
        <div className="App">
            <input
                type="text"
                value={serverIP}
                onChange={handleServerIPChange}
            />
            <input
                type="number"
                value={serverPort}
                onChange={handleServerPortChange}
            />
            <button onClick={connectToServer}>Connect To Server</button>

            <br></br>
        </div>
    );
}

export default AppServerConnection;
