import { sendData } from "../socket/socket";
import { useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { isConnectedAtom, userAtom } from "../store/store.ts";
import WelcomeUser from "../components/WelcomeUser.tsx";
import JoinSession from "./JoinSession.tsx";
import Button from "../components/Button.tsx";

function Connection() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, _setUser] = useAtom(userAtom);
  const setIsConnected = useSetAtom(isConnectedAtom);

  const [joinSession, setJoinSession] = useState(false)

  const createSession = () => {
    sendData("test_message", {
      stage: "prelobby",
      task: "new_session",
      username: user
    });
    setIsConnected(true);
  };

  const connectionType = joinSession ?
    <JoinSession /> :
    <>
      <WelcomeUser />
      <div id="sessionOptions">
        <Button bg="primary" onClick={createSession}>Create Session</Button>
        <Button margin="0 0 0 1rem" bg="primary" onClick={() => { setJoinSession(true) }}>Join Session</Button>
        {}
      </div>
    </>

  return connectionType
}

export default Connection;
