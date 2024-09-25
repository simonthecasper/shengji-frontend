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

    function selectGame(game: string) {
        setSelectedGame(game);
    }

    //  TODO: add optional disabled Button Prop
    return (
        <div className="gameSelector spaceContents ">
            <h2>Select a Game</h2>
            <div className="gameTileContainer">
                {games.map((game) => {
                    return (
                        <Button
                            key={game}
                            bg="primary"
                            onClick={() => selectGame(game)}
                            disabled={
                                game === selectedGame ||
                                userPlayerID != hostPlayerID
                            }
                        >
                            {game}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
};

export default GameSelector;
