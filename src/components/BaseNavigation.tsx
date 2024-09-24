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

    const backButtonClick = useSetAtom(backButtonClickAtom);
    const nextButtonClick = useSetAtom(nextButtonClickAtom);

    const backButtonOnClick = () => {
        backButtonClick();
    };

    const nextButtonOnClick = () => {
        nextButtonClick();
    };

    return <>
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
            <Button bg="secondary" onClick={nextButtonOnClick}>
                {nextButtonText}
            </Button>
        </div>
    </>
}

export default BaseNavigation;
