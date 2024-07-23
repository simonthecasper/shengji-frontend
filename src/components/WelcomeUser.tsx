import { useAtomValue } from "jotai"
import { userAtom } from "../store/store"

const WelcomeUser = () => {
  const user = useAtomValue(userAtom)

  return (
    <div id="welcomeDiv" className="fade_out">Welcome {user}</div>
  )
}

export default WelcomeUser
