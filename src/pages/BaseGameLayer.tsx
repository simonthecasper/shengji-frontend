import { useAtom, useAtomValue, useSetAtom } from "jotai/react";
import {
    backButtonTextAtom,
    hostPlayerIDAtom,
    isGameConfiguredAtom,
    playerAttributesAtom,
    sessionIDAtom,
    nextButtonTextAtom,
    pageStateAtom,
    disconnectAtom,
} from "../store/store";
import { Fragment } from "react/jsx-runtime";
import Button from "../components/Button";
import LobbyPage from "./LobbyPage";
import { disconnect } from "../socket/socket";

const BaseGameLayer = () => {
    const [pageState, setPageState] = useAtom(pageStateAtom);
    const sessionId = useAtomValue(sessionIDAtom);
    const isGameConfigured = useAtomValue(isGameConfiguredAtom);

    const playerAttributes = useAtomValue(playerAttributesAtom);
    const hostPlayerID = useAtomValue(hostPlayerIDAtom);
    const hostPlayerUsername =
        hostPlayerID === null ? "" : playerAttributes[hostPlayerID].username;

    const backButtonText = useAtomValue(backButtonTextAtom);
    const nextButtonText = useAtomValue(nextButtonTextAtom);

    const disconnect = useSetAtom(disconnectAtom);

    const layerContent = () => {
        let output = <Fragment />;
        if (!isGameConfigured) output = <LobbyPage />;
        return output;
    };

    const backButtonClick = () => {
        if (pageState === "lobby") {
            disconnect();
        }
    };

    //  TODO: make components for header and chatbox
    return (
        <div id="baseLayerContainer" className="fillContainer">
            <div id="navigationContainer">
                <Button bg="danger" onClick={backButtonClick}>
                    {backButtonText}
                </Button>
                <div>
                    <h1>
                        {hostPlayerUsername.concat("'s ")}
                        Lobby
                    </h1>
                    <h2>Lobby ID: {sessionId}</h2>
                </div>
                <Button bg="secondary" onClick={() => true}>
                    {nextButtonText}
                </Button>
            </div>
            {layerContent()}
            <div id="chatBoxContainer">Chatbox</div>
        </div>
    );
};

export default BaseGameLayer;
