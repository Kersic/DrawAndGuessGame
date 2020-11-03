import React from 'react';
import Message from "./Message";

const Chat = ({messages}) => {
    return (
        <div>
            {messages.map((message, index)=> (
                <Message key={index} name={message.user} message={message.text} />
            ))}
        </div>
    )
}

export default Chat;