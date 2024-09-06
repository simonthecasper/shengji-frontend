import { useAtomValue } from "jotai/react";
import ListOfPlayers from "../components/ListOfPlayers";
import GameSelector from "../components/GameSelector";
import { sessionIDAtom } from "../store/store";

const LobbyPage = () => {
    let sessionID = useAtomValue(sessionIDAtom);

    return (
        <div id="lobbyContainer">
            {<h1>{sessionID}</h1>}
            <ListOfPlayers />
            <GameSelector />
        </div>
    );
};

export default LobbyPage;
