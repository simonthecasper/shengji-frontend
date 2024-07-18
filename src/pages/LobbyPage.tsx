import { useAtomValue } from "jotai/react"
import { selectedGameAtom } from "../store/store"
import ListOfPlayers from "../components/ListOfPlayers"

const LobbyPage = () => {
  const selectedGame = useAtomValue(selectedGameAtom)

  return (
    <div id="lobbyContainer">
      <h1>{selectedGame}</h1>
      <ListOfPlayers />
    </div>
  )
}

export default LobbyPage
