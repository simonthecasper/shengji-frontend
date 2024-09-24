import { useEffect, useRef, useState } from 'react';
import { socketConnection } from "../socket/socket";
import { userPlayerIDAtom } from '../store/store';
import Messages from '../types/Message';
import Button from './Button';
import { useAtomValue } from 'jotai';

const ChatBox = () => {
    const messageContainerRef = useRef(null);
    const sc = socketConnection;
    const [messages, setMessages] = useState<Messages[]>(new Array<Messages>())
    const input = useRef<HTMLInputElement>(null)
    const userPlayerID = useAtomValue(userPlayerIDAtom)

    const sendNewMessage = () => {
        if (input.current) {
            const sender: Messages = {
                player_id: userPlayerID,
                message: input.current.value
            }
            sc.send(sender)
            input.current.value = ""
        }
    }

    useEffect(() => {
        // Listen for new messages from the WebSocket
        sc.on('chat_message', (message) => {
            console.log(message)

            setMessages([...messages, { player_id: message.player_id, message: message.message }])

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
            return (<div>
                <div>
                    {msg.player_id}
                </div>
                <div>
                    {msg.message}
                </div>

            </div>)
        })
    }

    return (
        <>
            <div ref={messageContainerRef}
                style={{ height: '300px', overflowY: 'scroll', border: '1px solid black' }}>
                {contents()}
            </div>
            <input ref={input} type="" />
            <Button bg="primary" onClick={sendNewMessage}>Send Message</Button>
        </>
    );
};

export default ChatBox;
