import { useAtomValue, useSetAtom } from "jotai/react";
import {
    backButtonTextAtom,
    hostPlayerIDAtom,
    playerAttributesAtom,
    sessionIDAtom,
    nextButtonTextAtom,
    backButtonClickAtom,
    attributesAndHostSignalAtom,
    nextButtonClickAtom,
    nextButtonStyleAtom,
    nextButtonActiveAtom,
    backButtonStyleAtom,
    backButtonActiveAtom,
} from "../store/store";
import Button from "./Button";
import NestedAnyObj from "../types/utility/NestedAnyObj";

const BaseNavigation = () => {
    const sessionId = useAtomValue(sessionIDAtom);

    const playerAttributes = useAtomValue(playerAttributesAtom);
    const hostPlayerID = useAtomValue(hostPlayerIDAtom);
    const attributesAndHostSignal = useAtomValue(attributesAndHostSignalAtom);

    const hostPlayerUsername = attributesAndHostSignal
        ? (playerAttributes as NestedAnyObj)[hostPlayerID!].username
        : "";

    const backButtonText = useAtomValue(backButtonTextAtom);
    const nextButtonText = useAtomValue(nextButtonTextAtom);

    const backButtonStyle = useAtomValue(backButtonStyleAtom);
    const nextButtonStyle = useAtomValue(nextButtonStyleAtom);

    const backButtonActive = useAtomValue(backButtonActiveAtom);
    const nextButtonActive = useAtomValue(nextButtonActiveAtom);

    const backButtonClick = useSetAtom(backButtonClickAtom);
    const nextButtonClick = useSetAtom(nextButtonClickAtom);

    const backButtonOnClick = () => {
        backButtonClick();
    };

    const nextButtonOnClick = () => {
        nextButtonClick();
    };

    return (
        <>
            <div id="navigationContainer">
                <Button
                    bg={backButtonStyle}
                    disabled={!backButtonActive}
                    onClick={backButtonOnClick}
                >
                    {backButtonText}
                </Button>
                <div>
                    <h1>
                        {hostPlayerUsername.concat("'s ")}
                        Lobby
                    </h1>
                    <h2>Lobby ID: {sessionId}</h2>
                </div>
                <Button
                    bg={nextButtonStyle}
                    disabled={!nextButtonActive}
                    onClick={nextButtonOnClick}
                >
                    {nextButtonText}
                </Button>
            </div>
        </>
    );
};

export default BaseNavigation;
