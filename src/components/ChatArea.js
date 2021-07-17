import React from 'react';
import '../styles/ChatArea.css'

export default class ChatArea extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return(
            <div>
                <div id="chat-container">
                    {this.props.user.username} has joined the game!
                </div>

                <div>
                    <form onSubmit={this.handleSubmit} id="chat-input">
                        <textarea id="chat-text" />
                        <input id="chat-button" type="submit" value="Send"/>
                    </form>
                </div>
            </div>
        )
    }

}