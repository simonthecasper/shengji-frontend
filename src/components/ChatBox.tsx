import { useEffect, useRef, useState } from 'react';
import { socketConnection } from "../socket/socket";
import Messages from '../interfaces/Message';

const ChatBox = () => {
    const messageContainerRef = useRef(null);
    const sc = socketConnection;
    const [messages, setMessages] = useState<Messages[]>(new Array<Messages>())

    useEffect(() => {
        // Listen for new messages from the WebSocket
        sc.on('chat_message', (message) => {
            console.log(message)
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
        return messages.map((msg: Messages) => {
            <div>
                <div>
                    {msg.player_id}
                </div>
                <div>
                    {msg.message}
                </div>

            </div>
        })
    }

    return (
        <>
            <div ref={messageContainerRef}
                style={{ height: '300px', overflowY: 'scroll', border: '1px solid black' }}>
                {contents()}
            </div>
            <input type="" />
        </>
    );
};

export default ChatBox;
