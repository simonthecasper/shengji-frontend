
import { useEffect } from "react";
import { socketConnection } from "../global/socket";
import UserLogin from "./UserLogin.tsx";
import Connection from "./Connection.tsx";


function StartPage() {

    const sc = socketConnection;


    useEffect(() => {
        sc.on("server_message", (data) => {
            console.log("Message received from server...");
            console.log(data);

            //update the contexts that represent the game state
        });
        // });
    }, [socketConnection]);


    return (
        <div className="StartPage">
            <UserLogin/>
            <Connection/>
        </div>
    );
}

export default StartPage;
