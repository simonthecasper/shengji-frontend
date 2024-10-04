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
import LobbyPage from "./LobbyPage";
import ChatBox from "../components/ChatBox";
import BaseNavigation from "../components/BaseNavigation";
import NestedAnyObj from "../types/utility/NestedAnyObj";

//  TODO: plan to style grid for Pregame and preLobby pages
const BaseGameLayer = () => {
    const pageState = useAtomValue(pageStateAtom);
    const nextButtonStyle = useAtomValue(nextButtonStyleAtom);

    const layerContent = () => {
        let output = <Fragment />;
        if (pageState === "lobby") output = <LobbyPage />;
        return output;
    };

    return (
        <div id="baseLayerContainer" className="fillContainer">
            <BaseNavigation />
            {layerContent()}
            <ChatBox />
        </div>
    );
};

export default BaseGameLayer;
