import { useEffect, useRef } from "react";
import { socketConnection } from "../socket/socket";
import { sessionIDAtom, userPlayerIDAtom } from "../store/store";
import Button from "./Button";
import { useAtomValue, useSetAtom } from "jotai";
import { chatHandlerAtom, chatMessagesAtom } from "../store/chatHandler";
import { C2S_sendChat } from "../socket/C2SMessages";

interface ChatMsgs {
    userName: string;
    text: string;
}

const ChatBox = () => {
    const sc = socketConnection;
    const chatHandler = useSetAtom(chatHandlerAtom);
    const input = useRef<HTMLInputElement>(null);
    const userPlayerID = useAtomValue(userPlayerIDAtom);
    const sessionID = useAtomValue(sessionIDAtom) as string | null;
    const messages = useAtomValue(chatMessagesAtom);

    const sendNewMessage = () => {
        if (input.current) {
            C2S_sendChat(
                sessionID as string,
                userPlayerID,
                input.current.value
            );
            input.current.value = "";
        }
    };

    useEffect(() => {
        sc.on("chat_message", (message) => {
            chatHandler(message);
        });

        return () => {
            sc.off("chat_message");
        };
    }, [sc, chatHandler]);

    const contents = () => {
        let keys = 0;
        return messages.map((msg: ChatMsgs) => {
            return (
                <div key={keys++}>
                    <div>Player Name: {msg.userName}</div>
                    <div>Message Text: {msg.text}</div>
                </div>
            );
        });
    };

    return (
        <div id="chatBoxContainer">
            <div className="header">
                <div className="header-title">Component Title</div>
                <div className="header-buttons">
                    <div className="button minimize">-</div>
                </div>
            </div>
            <div
                style={{
                    height: "300px",
                    overflowY: "scroll",
                    border: "1px solid black",
                    color: "red",
                }}
                className="spaceContents"
            >
                {contents()}
            </div>
            <input className="baseInput" ref={input} type="" />
            <Button bg="primary" onClick={sendNewMessage}>
                Send Message
            </Button>
        </div>
    );
};

export default ChatBox;
