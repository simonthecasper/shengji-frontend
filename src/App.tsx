import { SetStateAction, useState } from "react";

function App() {
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
        console.log("asdf");
        console.log("serverIP:", serverIP);
        console.log("serverPort:", serverPort);
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

export default App;
