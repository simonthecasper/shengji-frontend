import { sendData } from "../global/socket";
import { useState } from "react";
import { useAtom } from "jotai";
import { isConnectedAtom, userAtom } from "../store/store.ts";
import WelcomeUser from "../components/WelcomeUser.tsx";

function Connection() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, _setUser] = useAtom(userAtom);
  const [isConnected, setIsConnected] = useAtom(isConnectedAtom);

  const [joinSessionID, updateJoinSessionID] = useState("");

  const changeJoinSessionID = (event: { target: { value: string } }) => {
    updateJoinSessionID(event.target.value);
  };
  const createSession = () => {
    sendData("test_message", {
      stage: "prelobby",
      task: "new_session",
      username: user
    });
    setIsConnected(true);
  };
  const joinSession = () => {
    if (!isConnected) {
      alert("Please enter and set a username first");
    } else if (joinSessionID.length != 4) {
      alert("The provided ID is not the correct length.");
    } else {
      const message_dict = {
        stage: "prelobby",
        task: "join_session",
        session_id: joinSessionID,
        username: user,
      };
      setIsConnected(true);

      sendData("test_message", message_dict);
    }
  };

  return (
    <>
      <WelcomeUser />
      <div id="sessionOptions">
        <button onClick={createSession}>Create Session</button>
        <br />
        <br />
        <input
          name="joinSessionID_input"
          value={joinSessionID}
          onChange={changeJoinSessionID}
        />
        <button onClick={joinSession}>Join Session</button> </div>
    </>
  )

}

export default Connection;
