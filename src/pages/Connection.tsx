import { useAtomValue } from "jotai";
import { userAtom } from "../store/store.ts";
import WelcomeUser from "../components/WelcomeUser.tsx";
import JoinSession from "./JoinSession.tsx";
import Button from "../components/Button.tsx";
import { C2S_createSession } from "../socket/C2SMessages.ts";

function Connection() {
    const username = useAtomValue(userAtom);

    const createSession = () => {
        C2S_createSession(username);
    };

    return (
        <>
            <WelcomeUser />
            <div id="sessionOptions">
                <Button bg="primary" onClick={createSession}>
                    Create Session
                </Button>
                <div>
                    <hr className="maxWidth" />
                    <span>OR</span>
                    <hr className="maxWidth" />
                </div>
                <JoinSession />
            </div>
        </>
    );
}

export default Connection;
