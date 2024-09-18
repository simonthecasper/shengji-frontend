import { useAtomValue, useSetAtom } from "jotai";
import { selectedGameAtom, gamesAtom } from "../store/store";

const GameSelector = () => {
    const selectedGame = useAtomValue(selectedGameAtom);
    const setSelectedGame = useSetAtom(selectedGameAtom);
    const games = useAtomValue(gamesAtom);

    function selectGame(game: string) {
        setSelectedGame(game);
    }

    //TODO: implement styling
    return (
        <>
            <h1>Select a Game</h1>
            <div className="gameTileContainer">
                {games.map((game) => {
                    return (
                        <div key={game}>
                            <button
                                className="gameTile"
                                onClick={() => selectGame(game)}
                                disabled={game === selectedGame}
                            >
                                {game}
                            </button>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default GameSelector;
