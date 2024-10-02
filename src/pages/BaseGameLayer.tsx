import { useAtomValue } from "jotai/react";
import { pageStateAtom } from "../store/pageStateAtom";
import { Fragment } from "react/jsx-runtime";
import LobbyPage from "./LobbyPage";
import ChatBox from "../components/ChatBox"
import BaseNavigation from "../components/BaseNavigation";

//  TODO: plan to style grid for Pregame and preLobby pages
const BaseGameLayer = () => {
    const pageState = useAtomValue(pageStateAtom);

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
    )
}

export default BaseGameLayer;
