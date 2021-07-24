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
        socket.on("broadcast_game_state", function(gameState) {
            console.log("GameState: " + gameState);
            gameState = JSON.parse(gameState);
            setMessages(gameState["chat_messages"]);
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
            <p>Chat: {messages}</p>
            {/* chat entry box below */}
            {/* <form onSubmit={e => sendMessage(e)}>
                <input onChange={handleTyping} type="text"></input>
                <input type="submit" value="Send"></input>
            </form> */}
        </div>  
    )
}

export default ChatArea