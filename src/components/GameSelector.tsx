import { useAtomValue, useSetAtom } from "jotai";
import { selectedGameAtom, gamesAtom } from "../store/store";

const GameSelector = () => {
    const setSelectedGame = useSetAtom(selectedGameAtom);
    const games = useAtomValue(gamesAtom);

    function selectGame(game: string) {
        setSelectedGame(game);
    }
    return (
        <>
            <div>
                <h1>Select a Game</h1>
                <div className="gameTileContainer">
                    {games.map((game) => {
                        return (
                            <div key={game}>
                                <button
                                    className="gameTile"
                                    onClick={() => selectGame(game)}
                                >
                                    {game}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default GameSelector;
