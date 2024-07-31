import { useAtomValue } from "jotai"
import { userAtom } from "../store/store"

const WelcomeUser = () => {
  const user = useAtomValue(userAtom)

  return (
    <h2 id="welcome">Welcome {user}</h2>
  )
}

export default WelcomeUser
