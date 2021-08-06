import React, { useContext, useState, useEffect, useRef } from 'react';
import { SocketContext } from '../socket';

const ChatArea = ({ user }) => {
    const socket = useContext(SocketContext);
    const [messages, setMessages] = useState([]);
    const [gameStatusMessage, setGameStatusMessage] = useState('');
    const inputBox = useRef(null);

    const handleServerMessage = (m) => {
        setMessages(m);
        console.log(messages);
    }
    
    useEffect(() => {
        socket.on("broadcast_game_state", function(gameState) {
            console.log("GameState from ChatArea: " + gameState);
            gameState = JSON.parse(gameState);
            setMessages(gameState["chat_messages"]);
            setGameStatusMessage(gameState["game_status_message"]);
            if (gameState["has_game_started"] == false) {
                setGameStatusMessage("Game has not started.");
            }
        });

        // socket.on("message", (msg) => {  // need listener for general incoming chat messages
        //     console.log(msg);
        //     handleServerMessage(msg);
        // });
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        let userMessage = inputBox.current.value;
        socket.emit("chat_message", user.username, userMessage);
    }

    return(
        <div>
            <p>Game Status: {gameStatusMessage}</p>
            <p>Chat:</p>
            {messages.map((message, index)=>{
                return <p>{message}</p>
            })}
            {/* chat entry box below */}
            <form onSubmit={e => sendMessage(e)}>
                <input class="message" type="text" ref={inputBox}></input>
                <input type="submit" value="Send"></input>
            </form>
        </div>  
    )
}

export default ChatArea