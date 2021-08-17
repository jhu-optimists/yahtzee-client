import React, { useContext, useState, useEffect } from 'react'
import { SocketContext } from '../socket'
import '../styles/ChatArea.css'

const ChatArea = ({ user }) => {
    const socket = useContext(SocketContext);
    const [messages, setMessages] = useState([]);
    const [gameStatusMessage, setGameStatusMessage] = useState('');
    const [outgoingMessage, setOutgoing] = useState('');

    const handleServerMessage = (m) => {
        setMessages(m);
    }
    
    useEffect(() => {
        socket.on("broadcast_game_state", function(gameState) {
            console.log("Game state:" + gameState);
            gameState = JSON.parse(gameState);
            setMessages(gameState["chat_messages"]);
            setGameStatusMessage(gameState["game_status_message"]);
            if (gameState["has_game_started"] == false) {
                setGameStatusMessage("Game has not started.");
            }
        });
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit("chat_message", user, outgoingMessage);
        setOutgoing('');
    }

    const handleTyping = (e) => {
        setOutgoing(e.target.value);
    }

    return(
        <div id="chat-container">
            <div id="chat-header">Y++ CHATROOM</div>
            <div id="chat-messages-container">
                {messages.map((message, index)=>{
                    return <p>{message}</p>
                })}
            </div>
            <div id="chat-input-container">
                <form onSubmit={e => sendMessage(e)}>
                    <input
                        id="chat-input-textbox" onChange={handleTyping}
                        value={outgoingMessage} class="message" type="text"
                    >
                    </input>
                    <input id="chat-button" type="submit" value="Send"></input>
                </form>
            </div>
        </div>  
    )
}

export default ChatArea