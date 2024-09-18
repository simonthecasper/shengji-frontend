import { useEffect, Fragment } from "react";
import { socketConnection } from "../socket/socket";
import UserLogin from "./UserLogin.tsx";
import Connection from "./Connection.tsx";
import BaseGameLayer from "./BaseGameLayer.tsx";

import { useAtomValue, useSetAtom } from "jotai";
import { pageStateAtom } from "../store/pageStateAtom.ts";
import { messageHandlerAtom } from "../store/messageHandler.ts";

function StartPage() {
    const pageState = useAtomValue(pageStateAtom);
    const messageHandler = useSetAtom(messageHandlerAtom);
    const sc = socketConnection;

    useEffect(() => {
        sc.on("server_message", (data) => {
            messageHandler(data);
        });
    }, [sc]);

    const routeUser = () => {
        let toReturn = <Fragment />;
        if (pageState === "login") {
            toReturn = <UserLogin />;
        } else if (pageState === "connect_session") {
            toReturn = <Connection />;
        } else if (pageState === "lobby") {
            toReturn = <BaseGameLayer />;
        }
        return toReturn;
    };

    return <div className="StartPage">{routeUser()}</div>;
}

export default StartPage;
