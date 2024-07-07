
import { useEffect, Fragment } from "react";
import { socketConnection } from "../global/socket";
import UserLogin from "./UserLogin.tsx";
import Connection from "./Connection.tsx";
import { useAtomValue } from 'jotai'
import { userAtom, isConnectedAtom } from '../store/store.ts'


function StartPage() {
    const name = useAtomValue(userAtom)
    const isConnected = useAtomValue(isConnectedAtom)
    const sc = socketConnection;


    useEffect(() => {
        sc.on("server_message", (data) => {
            console.log("Message received from server...");
            console.log(data);

            //update the contexts that represent the game state
        });
        // });
    }, [socketConnection]);


    const routeUser = () => {
        let toReturn = <Fragment />
        if (!name) {
            toReturn = <UserLogin />
        }
        else if (name && !isConnected) {
            toReturn = <Connection />
        }
        return toReturn
    }

    return (
        <div className="StartPage">
            {
                routeUser()
            }
        </div>
    );
}

export default StartPage;
