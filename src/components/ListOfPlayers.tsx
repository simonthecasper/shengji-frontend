import { listOfPlayersAtom } from "../store/store"
import { useAtomValue } from "jotai"

const ListOfPlayers = () => {
    const listOfPlayers = useAtomValue(listOfPlayersAtom)

    return (
        <div>
            <ul>
                {listOfPlayers.map(player => {
                    return (
                        <li key={player}>{player}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ListOfPlayers
