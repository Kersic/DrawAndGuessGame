import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from "./Message";

const Chat = () => {
    const messages = [
        {
            name: "Tadeja",
            message: "Danes je lep dan",
        },
        {
            name: "Saso",
            message: "Kaj te vem",
        },
        {
            name: "Saso",
            message: "Dolgi text bla bla bla. kak si kaj. je odgovor vlak. tra la la tra la la",
        },
        {
            name: "Tadeja",
            message: "☀️",
        },
        {
            name: "Saso",
            message: "Test",
        },
        {
            name: "Tadeja",
            message: "Danes je lep dan",
        },
        {
            name: "Saso",
            message: "Kaj te vem",
        },
        {
            name: "Saso",
            message: "Dolgi text bla bla bla. kak si kaj. je odgovor vlak. tra la la tra la la",
        },
        {
            name: "Tadeja",
            message: "☀️",
        },
        {
            name: "Saso",
            message: "Test",
        }
    ]
    return (
        <ScrollToBottom>
            {messages.map((message)=> (
                <Message key={message.message} name={message.name} message={message.message} />
            ))}
        </ScrollToBottom>
    )
}

export default Chat;