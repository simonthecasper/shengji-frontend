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
    <div id="baseLayerContainer">
      <div id="navigationContainer">
        <button></button>
        <div>
          <h1>Game Host Lobby</h1>
          <h2>Lobby ID</h2>
        </div>
        <button></button>
      </div>
      {layerContent()}
      <div>Chatbox</div>
    </div>
  )
}

export default BaseGameLayer;
