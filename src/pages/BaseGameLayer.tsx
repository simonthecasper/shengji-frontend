import { useAtomValue } from "jotai/react"
import { isGameConfiguredAtom } from "../store/store"
import { Fragment } from "react/jsx-runtime"
import SelectGamePage from "./SelectGamePage"

const BaseGameLayer = () => {
  const isGameConfigured = useAtomValue(isGameConfiguredAtom);

  const layerContent = () => {
    let output = <Fragment />
    if (!isGameConfigured) output = <SelectGamePage />
    return output;
  }

  return (
    <div id="baseLayerContainer" className="fillContainer">
      <div id="navigationContainer">
        <button>Placeholder txt</button>
        <div>
          <h1>Game Host Lobby</h1>
          <h2>Lobby ID</h2>
        </div>
        <button>Placeholder txt</button>
      </div>
      {layerContent()}
      <div id="chatBoxContainer">Chatbox</div>
    </div>
  )
}

export default BaseGameLayer;
