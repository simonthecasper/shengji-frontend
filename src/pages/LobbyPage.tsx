import ListOfPlayers from "../components/ListOfPlayers";
import GameSelector from "../components/GameSelector";

const LobbyPage = () => {
    return (
        <div id="lobbyContainer">
            <ListOfPlayers />
            <GameSelector />
        </div>
    );
};

export default LobbyPage;
