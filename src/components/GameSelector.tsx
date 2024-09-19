import { useAtomValue, useSetAtom } from "jotai";
import {
    selectedGameAtom,
    gamesAtom,
    hostPlayerIDAtom,
    userPlayerIDAtom,
} from "../store/store";
import Button from "./Button";

const GameSelector = () => {
    const selectedGame = useAtomValue(selectedGameAtom);
    const setSelectedGame = useSetAtom(selectedGameAtom);
    const games = useAtomValue(gamesAtom);

    const userPlayerID = useAtomValue(userPlayerIDAtom);
    const hostPlayerID = useAtomValue(hostPlayerIDAtom);

    const isHost = userPlayerID === hostPlayerID;

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
                            <Button
                                bg={
                                    !isHost
                                        ? "inactive"
                                        : game === selectedGame
                                        ? "primary_selected"
                                        : "primary"
                                }
                                onClick={() => selectGame(game)}
                                disabled={
                                    game === selectedGame ||
                                    userPlayerID != hostPlayerID
                                }
                            >
                                {game}
                            </Button>

                            {/* <button
                                className="gameTile"
                                onClick={() => selectGame(game)}
                                disabled={
                                    game === selectedGame ||
                                    userPlayerID != hostPlayerID
                                }
                            >
                                {game}
                            </button> */}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default GameSelector;
