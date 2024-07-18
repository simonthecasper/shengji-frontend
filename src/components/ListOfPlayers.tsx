import { listOfPlayersAtom } from "../store/store"
import { useAtomValue } from "jotai"

const ListOfPlayers = () => {
    const listOfPlayers = useAtomValue(listOfPlayersAtom)

    return (
        <div>
            <ul>
                {listOfPlayers.map(player => {
                    return (
                        <li>{player}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ListOfPlayers
