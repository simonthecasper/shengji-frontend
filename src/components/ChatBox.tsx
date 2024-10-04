import { Fragment, useEffect, useRef } from 'react';
import { socketConnection } from "../socket/socket";
import { collapsedChatBoxAtom, sessionIDAtom, userPlayerIDAtom } from '../store/store';
import Button from './Button';
import {useAtom, useAtomValue, useSetAtom} from 'jotai';
// import IncomingServerChatMessages from '../types/Message';
// import NestedAnyObj from '../types/utility/NestedAnyObj';
import { chatHandlerAtom, chatMessagesAtom } from '../store/chatHandler';

interface ChatMsgs {
    userName: string;
    text: string
}

const ChatBox = () => {
    const sc = socketConnection;
    // const [messages, setMessages] = useState<ChatMsgs[]>(new Array<ChatMsgs>())
    const chatHandler = useSetAtom(chatHandlerAtom);
    const input = useRef<HTMLInputElement>(null)
    const userPlayerID = useAtomValue(userPlayerIDAtom)
    const sessionId = useAtomValue(sessionIDAtom) as string | null
    const messages = useAtomValue(chatMessagesAtom)
    // const players = useAtomValue(playerAttributesAtom) as NestedAnyObj
    const [collapsedChat, setCollapsedChat] = useAtom(collapsedChatBoxAtom)

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
        sc.on("chat_message", (message) => {
            chatHandler(message)
        });

        return () => {
            sc.off("chat_message")
        }
    }, [sc, chatHandler]);


    const contents = () => {
        let keys = 0
        return messages.map((msg: ChatMsgs) => {
            return (<div key={keys++}>
                <div>
                    Player Name: {msg.userName}
                </div>
                <div>
                    Message Text: {msg.text}
                </div>

            </div>)
        })
    }

    const getChatContents = () => {
        let content = <Fragment />

        if (collapsedChat) {
            content = (
                <>
                    <div
                        style={{ height: '300px', overflowY: 'scroll', border: '1px solid black', color: 'red' }} className="spaceContents">
                        {contents()}
                    </div>
                    <input className="baseInput" ref={input} type="" />
                    <Button bg="primary" onClick={sendNewMessage}>Send Message</Button>
                </>
            )
        }
        return content
    }

    return (
        <div id="chatBoxContainer">
            <div className="header">
                <div className="header-title">Component Title</div>
                <div className="header-buttons">
                    <div className="button minimize" >-</div>
                </div>
            </div>
            {getChatContents()}
        </div >
    );
};

export default ChatBox;
