import { useAtom, useAtomValue, useSetAtom } from "jotai/react";
import {
    playerAttributesAtom,
    sessionIDAtom,
    hostPlayerIDAtom,
    attributesAndHostSignalAtom,
    backButtonTextAtom,
    nextButtonTextAtom,
    backButtonClickAtom,
    nextButtonClickAtom,
    nextButtonStyleAtom,
} from "../store/store";
import { pageStateAtom } from "../store/pageStateAtom";
import { Fragment } from "react/jsx-runtime";
import Button from "../components/Button";
import LobbyPage from "./LobbyPage";
import ChatBox from "../components/ChatBox";
import NestedAnyObj from "../types/utility/NestedAnyObj";

//Bunch of atom imports are not working for some reason

const BaseGameLayer = () => {
    const [pageState] = useAtom(pageStateAtom);
    const sessionId = useAtomValue(sessionIDAtom);

    const playerAttributes = useAtomValue(playerAttributesAtom);
    const hostPlayerID = useAtomValue(hostPlayerIDAtom);
    const attributesAndHostSignal = useAtomValue(attributesAndHostSignalAtom);

    const hostPlayerUsername = attributesAndHostSignal
        ? (playerAttributes as NestedAnyObj)[hostPlayerID!].username
        : "";

    const backButtonText = useAtomValue(backButtonTextAtom);
    const nextButtonText = useAtomValue(nextButtonTextAtom);

    const backButtonClick = useSetAtom(backButtonClickAtom);
    const nextButtonClick = useSetAtom(nextButtonClickAtom);

    const nextButtonStyle = useAtomValue(nextButtonStyleAtom);

    const layerContent = () => {
        let output = <Fragment />;
        if (pageState === "lobby") output = <LobbyPage />;
        return output;
    };

    const backButtonOnClick = () => {
        backButtonClick();
    };

    const nextButtonOnClick = () => {
        nextButtonClick();
    };

    //  TODO: make components for header and chatbox
    return (
        <div id="baseLayerContainer" className="fillContainer">
            <div id="navigationContainer">
                <Button bg="danger" onClick={backButtonOnClick}>
                    {backButtonText}
                </Button>
                <div>
                    <h1>
                        {hostPlayerUsername.concat("'s ")}
                        Lobby
                    </h1>
                    <h2>Lobby ID: {sessionId}</h2>
                </div>
                <Button bg={nextButtonStyle} onClick={nextButtonOnClick}>
                    {nextButtonText}
                </Button>
            </div>
            {layerContent()}
            <div id="chatBoxContainer">
                <ChatBox />
            </div>
        </div>
    );
};

export default BaseGameLayer;
