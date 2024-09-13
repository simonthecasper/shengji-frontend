import { useAtomValue } from "jotai/react"
import { isGameConfiguredAtom, sessionIDAtom } from "../store/store"
import { Fragment } from "react/jsx-runtime"
import SelectGamePage from "./SelectGamePage"
import ChatBox from "../components/ChatBox"
import Button from "../components/Button"

const BaseGameLayer = () => {
  const sessionId = useAtomValue(sessionIDAtom)
  const isGameConfigured = useAtomValue(isGameConfiguredAtom);

  const layerContent = () => {
    let output = <Fragment />
    if (!isGameConfigured) output = <SelectGamePage />
    return output;
  }

  //  TODO: make components for header and chatbox
  return (
    <div id="baseLayerContainer" className="fillContainer">
      <div id="navigationContainer">
        <Button bg="danger" onClick={() => true}>Placeholder txt</Button>
        <div>
          <h1>Game Host Lobby</h1>
          <h2>Lobby ID: {sessionId}</h2>
        </div>
        <Button bg="secondary" onClick={() => true}>Placeholder txt</Button>
      </div>
      {layerContent()}
      <div id="chatBoxContainer">
        <ChatBox />
      </div>
    </div>
  )
}

export default BaseGameLayer;
