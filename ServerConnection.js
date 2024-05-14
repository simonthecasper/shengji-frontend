
let socket;

let username;
let server_ip;
let server_port;

let player_id;
let session_id;

let server_connected = false;
let in_session = false;

document.getElementById("server_info_submit_button").onclick = function () {
    server_ip = document.getElementById("server_ip").value;
    server_port = document.getElementById("server_port").value;

    console.log("server_ip: " + server_ip + " | Port: " + server_port);
    console.log("Attempting Websocket Handshake...");

    socket = new WebSocket(`ws://${server_ip}:${server_port}`);

    socket.onopen = () => {
        console.log("WebSocket connection successful.");
        server_connected = true;
    }

    socket.onmessage = (message) => {
        console.log("Incoming message:" + message.data);
        message_handler(message.data)
    }
}


function message_handler(message_str) {
    // console.log(message_str);

    message_json = JSON.parse(message_str);

    if (message_json["stage"] == "prelobby") {
        console.log("session updated");
        in_session = true;
        session_id = message_json.session_id;
        player_id = message_json.player_id;

        document.getElementById("SessionStatus").innerText = "Session ID:" + session_id;
    }
}


document.getElementById("new_session_button").onclick = function () {
    if (!in_session) {
        let request = '{"stage": "prelobby", "task": "new_session"}'

        socket.send(request);
        console.log("New Session Request: " + request);
    }
}


document.getElementById("join_session_button").onclick = function () {
    if (!in_session) {

        let target_session = document.getElementById("join_session_id_input").value;

        let request = {
            "stage": "prelobby",
            "task": "join_session",
            "session_id": target_session
        }

        let request_str = JSON.stringify(request);

        socket.send(request_str);
        console.log("Join Session Request: " + request_str);
    }
}

document.getElementById("message_send_button").onclick = function () {
    // console.log(server_connected);
    if (server_connected) {
        let message_str = document.getElementById("message_input").value;

        username = document.getElementById("username_input").value;

        let message = {
            "session_id": session_id,
            "player_id": player_id,
            "username": username,
            "stage": "chat",
            "message": message_str,
        }

        let full_message_str = JSON.stringify(message);

        console.log("Chat message:" + full_message_str);
        socket.send(JSON.stringify(message));
    } else {
        console.log("Connect to the server first");
    }
}