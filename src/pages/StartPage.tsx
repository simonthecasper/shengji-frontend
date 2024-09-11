import { useEffect, Fragment } from "react";
import { socketConnection } from "../socket/socket";
import UserLogin from "./UserLogin.tsx";
import Connection from "./Connection.tsx";
import BaseGameLayer from "./BaseGameLayer.tsx";

import { useAtomValue, useSetAtom } from "jotai";
import { userAtom, isInLobbyAtom } from "../store/store.ts";
import { messageHandlerAtom } from "../store/messageHandler.ts";

function StartPage() {
    const name = useAtomValue(userAtom);
    const isInLobby = useAtomValue(isInLobbyAtom);
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
        } else if (name && !isInLobby) {
            toReturn = <Connection />;
        } else if (name && isInLobby) {
            toReturn = <BaseGameLayer />;
        }
        return toReturn;
    };

    return <div className="StartPage">{routeUser()}</div>;
}

export default StartPage;
