import StartPage from "./StartPage";
import { useState } from "react";

function PageManager() {
    const [username, setUsername] = useState("");

    return (
        <div className="PageManager">
            <StartPage username={username} setUsername={setUsername} />
        </div>
    );
}

export default PageManager;
