import { io } from "socket.io-client";

// let socketConnection = {};
let socketConnection = io();

export function initSocketConnection() {
    if (!isConnected()) {
        console.log("Creating connection");
        socketConnection = io("ws://localhost:12123");
    } else {
        console.log("Already connected.")
    }
}

export function sendData(event, data) {
    socketConnection.emit(event, data);
}

export function isConnected() {
    return socketConnection.connected;
}

export { socketConnection };