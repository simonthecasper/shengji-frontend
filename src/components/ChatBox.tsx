import { useEffect, useRef, useState } from 'react';
import { socketConnection } from "../socket/socket";
import { playerAttributesAtom, sessionIDAtom, userPlayerIDAtom } from '../store/store';
import Button from './Button';
import { useAtomValue } from 'jotai';
import IncomingServerChatMessages from '../types/Message';
import NestedAnyObj from '../types/utility/NestedAnyObj';

interface ChatMsgs {
    userName: string;
    text: string
}

const ChatBox = () => {
    const sc = socketConnection;
    const [messages, setMessages] = useState<ChatMsgs[]>(new Array<ChatMsgs>())
    const input = useRef<HTMLInputElement>(null)
    const userPlayerID = useAtomValue(userPlayerIDAtom)
    const sessionId = useAtomValue(sessionIDAtom) as string | null
    const players = useAtomValue(playerAttributesAtom) as NestedAnyObj

    const sendNewMessage = () => {
        if (input.current) {
            const sender = {
                session_id: sessionId,
                player_id: userPlayerID,
                message: input.current.value,
                task: "send_chat",
                stage: "chat"
            }
            sc.send(sender)
            input.current.value = ""
        }
    }

    useEffect(() => {
        console.log("players outside sc.on: ", players)
        // Listen for new messages from the WebSocket
        sc.on('chat_message', (message: string) => {
            const messageObject = JSON.parse(message) as IncomingServerChatMessages;
            console.log("Incoming message: ", messageObject)
            console.log("players inside sc.on: ", players)
            if (players !== null) {
                const playerName = players[messageObject.player_id].username
                console.log("spread messages: ", { ...messages })
                setMessages([...messages, { userName: playerName, text: messageObject.message }])
            }


            // Create a new message element
            // const messageElement = document.createElement('div');
            // messageElement.textContent = message;
            // 
            // // Append it to the message container
            // messageContainerRef.current.appendChild(messageElement);
            //
            // // Optional: Auto-scroll to the bottom of the chat
            // messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        });
    }, [sc]);
    const contents = () => {
        let keys = 0
        return messages.map((msg: ChatMsgs) => {
            return (<div key={keys++}>
                <div>
                    {msg.userName}
                </div>
                <div>
                    {msg.text}
                </div>

            </div>)
        })
    }

    return (
        <div id="chatBoxContainer">
            <div className="header">
                <div className="header-title">Component Title</div>
                <div className="header-buttons">
                    <div className="button minimize" >-</div>
                </div>
            </div>
            <div
                style={{ height: '300px', overflowY: 'scroll', border: '1px solid black', color: 'red' }}>
                {contents()}
            </div>
            <input className="baseInput" ref={input} type="" />
            <Button bg="primary" onClick={sendNewMessage}>Send Message</Button>
        </div>
    );
};

export default ChatBox;
