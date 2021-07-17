import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../socket';

const ChatArea = () => {
    const [messages, setMessages] = useState('')
    const [outgoingMsg, setOutgoing] = useState('')
    const socket = useContext(SocketContext);

    const handleServerMessage = (m) => {
        setMessages(m);
        console.log(messages);
    }
    
    useEffect(() => {
        socket.emit("join", "Bob")
        socket.on("join_success", (msg) => {
            handleServerMessage(msg);
        });

        // socket.on("message", (msg) => {  // need listener for general incoming chat messages
        //     console.log(msg);
        //     handleServerMessage(msg);
        // });
    })

    const handleTyping = (e) => {
        const newMsg = e.target.value;
        setOutgoing(newMsg);
    }

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit("message", outgoingMsg);
    }

    return(
        <div>
            <p>{messages}</p>
            {/* chat entry box below */}
            {/* <form onSubmit={e => sendMessage(e)}>
                <input onChange={handleTyping} type="text"></input>
                <input type="submit" value="Send"></input>
            </form> */}
        </div>  
    )
}

export default ChatArea