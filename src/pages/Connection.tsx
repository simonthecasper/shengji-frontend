import { sendData } from "../socket/socket";
import { useAtom, useSetAtom } from "jotai";
import { isConnectedAtom, userAtom } from "../store/store.ts";
import WelcomeUser from "../components/WelcomeUser.tsx";
import JoinSession from "./JoinSession.tsx";
import Button from "../components/Button.tsx";

function Connection() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, _setUser] = useAtom(userAtom);
  const setIsConnected = useSetAtom(isConnectedAtom);

  const createSession = () => {
    sendData("test_message", {
      stage: "prelobby",
      task: "new_session",
      username: user
    });
    setIsConnected(true);
  };

  return (
    <>
      <WelcomeUser />
      <div id="sessionOptions">
        <Button bg="primary" onClick={createSession}>Create Session</Button>
        <div>
          <hr className="maxWidth" />
          <span>OR</span>
          <hr className="maxWidth" />
        </div>
        <JoinSession />
      </div>
    </>
  )
}

export default Connection;
