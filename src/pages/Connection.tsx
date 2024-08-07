import { sendData } from "../global/socket";
import { useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { isConnectedAtom, userAtom } from "../store/store.ts";
import WelcomeUser from "../components/WelcomeUser.tsx";
import JoinSession from "./JoinSession.tsx";

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
        <button onClick={createSession}>Create Session</button>
        <button onClick={() => { setJoinSession(true) }}>Join Session</button>
        {}
      </div>
    </>

  return connectionType
}

export default Connection;
