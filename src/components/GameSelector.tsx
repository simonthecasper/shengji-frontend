import { useAtomValue, useSetAtom } from "jotai";
import {
    selectedGameAtom,
    gamesAtom,
    hostPlayerIDAtom,
    userPlayerIDAtom,
} from "../store/store";

const GameSelector = () => {
    const selectedGame = useAtomValue(selectedGameAtom);
    const setSelectedGame = useSetAtom(selectedGameAtom);
    const games = useAtomValue(gamesAtom);

    const userPlayerID = useAtomValue(userPlayerIDAtom);
    const hostPlayerID = useAtomValue(hostPlayerIDAtom);

    function selectGame(game: string) {
        setSelectedGame(game);
    }

    //TODO: implement styling
    return (
        <div className="gameSelector spaceContents ">
            <h2>Select a Game</h2>
            <div className="gameTileContainer">
                {games.map((game) => {
                    return (
                        <div key={game}>
                            <button
                                className="gameTile"
                                onClick={() => selectGame(game)}
                                disabled={
                                    game === selectedGame ||
                                    userPlayerID != hostPlayerID
                                }
                            >
                                {game}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GameSelector;
