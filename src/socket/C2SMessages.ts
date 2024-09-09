import { sendData } from "./socket";

export function C2S_createSession(username: string) {
    let messageObject = {
        stage: "prelobby",
        task: "new_session",
        username: username,
    };
    
    sendData("test_message", messageObject);
}

export function C2S_joinSession(username: string, session_id: string) {
    let messageObject = {
        stage: "prelobby",
        task: "join_session",
        session_id: session_id,
        username: username,
    };

    sendData("test_message", messageObject);
}