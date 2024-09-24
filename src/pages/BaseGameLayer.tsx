import { useAtom } from "jotai/react";
import { pageStateAtom } from "../store/pageStateAtom";
import { Fragment } from "react/jsx-runtime";
import LobbyPage from "./LobbyPage";
import ChatBox from "../components/ChatBox"
import BaseNavigation from "../components/BaseNavigation";

const BaseGameLayer = () => {
    const [pageState] = useAtom(pageStateAtom);

    const layerContent = () => {
        let output = <Fragment />;
        if (pageState === "lobby") output = <LobbyPage />;
        return output;
    };

    //  TODO: make components for header and chatbox
    return (
        <div id="baseLayerContainer" className="fillContainer">
            <BaseNavigation />
            {layerContent()}
            <div id="chatBoxContainer">
                <ChatBox />
            </div>
        </div>
    )
}

export default BaseGameLayer;
