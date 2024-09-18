import { useAtomValue } from "jotai/react";
import {
    hostPlayerIDAtom,
    isGameConfiguredAtom,
    playerAttributesAtom,
    sessionIDAtom,
} from "../store/store";
import { Fragment } from "react/jsx-runtime";
import Button from "../components/Button";
import LobbyPage from "./LobbyPage";

const BaseGameLayer = () => {
    const sessionId = useAtomValue(sessionIDAtom);
    const isGameConfigured = useAtomValue(isGameConfiguredAtom);
    const playerAttributes = useAtomValue(playerAttributesAtom);
    const hostPlayerID = useAtomValue(hostPlayerIDAtom);

    const layerContent = () => {
        let output = <Fragment />;
        if (!isGameConfigured) output = <LobbyPage />;
        return output;
    };

    //  TODO: make components for header and chatbox
    return (
        <div id="baseLayerContainer" className="fillContainer">
            <div id="navigationContainer">
                <Button bg="danger" onClick={() => true}>
                    Placeholder txt
                </Button>
                <div>
                    <h1>
                        {hostPlayerID === ""
                            ? "Game"
                            : playerAttributes[hostPlayerID].username.concat(
                                  "'s "
                              )}
                        Lobby
                    </h1>
                    <h2>Lobby ID: {sessionId}</h2>
                </div>
                <Button bg="secondary" onClick={() => true}>
                    Placeholder txt
                </Button>
            </div>
            {layerContent()}
            <div id="chatBoxContainer">Chatbox</div>
        </div>
    );
};

export default BaseGameLayer;
