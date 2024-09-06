import { useEffect, Fragment } from "react";
import { socketConnection } from "../socket/socket";
import UserLogin from "./UserLogin.tsx";
import Connection from "./Connection.tsx";
import { useAtomValue, useSetAtom } from "jotai";
import { userAtom, isConnectedAtom } from "../store/store.ts";
import LobbyPage from "./LobbyPage.tsx";
import { messageHandlerAtom } from "../store/store.ts";

function StartPage() {
    const name = useAtomValue(userAtom);
    const isConnected = useAtomValue(isConnectedAtom);
    const messageHandler = useSetAtom(messageHandlerAtom);
    const sc = socketConnection;

    useEffect(() => {
        sc.on("server_message", (data) => {
            messageHandler(data);
        });
    }, [sc]);

    const routeUser = () => {
        let toReturn = <Fragment />;
        if (!name) {
            toReturn = <UserLogin />;
        } else if (name && !isConnected) {
            toReturn = <Connection />;
        } else if (name && isConnected) {
            toReturn = <LobbyPage />;
        }
        return toReturn;
    };

    return <div className="StartPage">{routeUser()}</div>;
}

export default StartPage;
