
import { useAtomValue, useSetAtom} from 'jotai';
import { selectedGameAtom, gamesAtom } from '../store/store';

export default function GameSelectionPage() {

    const  setSelectedGame = useSetAtom(selectedGameAtom)
    const games = useAtomValue(gamesAtom)

    function selectGame(game: string) {
        setSelectedGame(game)
    }

    function gameOptions() {
        return (
            <div>
                <h1>Game Selection Page</h1>
                <h2>Select a game to play</h2>
                <ul>
                    {games.map((game) => {
                        return (
                            <li key={game}>
                                <button onClick={() => selectGame(game)}>{game}</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
    return gameOptions()
}
