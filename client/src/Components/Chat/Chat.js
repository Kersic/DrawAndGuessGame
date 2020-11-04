import React, {useEffect, useRef} from 'react';
import Message from "./Message";

const Chat = ({messages}) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);

    return (
        <div>
            {messages.map((message, index)=> (
                <Message key={index} name={message.user} message={message.text} />
            ))}
            <div ref={messagesEndRef} />
        </div>
    )
}

export default Chat;