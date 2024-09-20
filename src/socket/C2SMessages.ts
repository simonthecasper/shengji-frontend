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

export function C2S_createGame(session_id: string, host_player_id: string) {
    let messageObject = {
        stage: "prelobby",
        task: "create_game",
        session_id: session_id,
        host_player_id: host_player_id,
    };

    sendData("test_message", messageObject);
}