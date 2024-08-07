import { SetStateAction, useState } from "react";
import { useRoutes } from "hookrouter"
import Start from "./pages/UserLogin";
import Lobby from "./pages/Lobby";
import PageManager from "./pages/PageManager";
import GameSelection from "./pages/GameSelection";
import Connection from "./pages/Connection";
import JoinSession from "./pages/JoinSession";
import UserLogin from "./pages/UserLogin";

const routes = {
    '/': () => <Start />,
    '/connection': () => <Connection />,
    '/game-selection': () => <GameSelection />,
    '/join-session': () => <JoinSession />,
    '/lobby': () => <Lobby />,
    '/page-manager': () => <PageManager />,
    '/user-login': () => <UserLogin />
}

function App() {
    const [serverIP, setServerIP] = useState("");
    const [serverPort, setServerPort] = useState(-1);
    const routeResult = useRoutes(routes)


    const handleServerIPChange = (event: {
        target: { value: SetStateAction<string> };
    }) => {
        const new_value = event.target.value;
        setServerIP(new_value);
    };

    const handleServerPortChange = (event: { target: { value: any } }) => {
        const new_value = event.target.value;
        setServerPort(new_value);
    };

    const connectToServer = () => {
        console.log("asdf");
        console.log("serverIP:", serverIP);
        console.log("serverPort:", serverPort);
    };
    return routeResult
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
