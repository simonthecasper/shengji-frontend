import { useAtomValue } from "jotai"
import { userAtom } from "../store/store"

const WelcomeUser = () => {
  const user = useAtomValue(userAtom)

  return (
    <h2>Welcome {user}</h2>
  )
}

export default WelcomeUser
