import React from 'react'
import { socket } from "../socket"
import DiceContainer from "./DiceContainer.js"
import '../styles/SelfArea.css'

export default class SelfArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currUser: '',
            gameStarted: false,
        }
        this.startGame = this.startGame.bind(this);
    }

    componentDidMount() {
        var self = this;
        socket.on("broadcast_game_state", function(gameState) {
          let gameStateObject = JSON.parse(gameState);
          self.setState({
            currUser: gameStateObject.user_with_turn,
            gameStarted: gameStateObject.has_game_started,
            gameEnded: gameStateObject.has_game_ended
          });
        });
    }

    startGame(e) {
		e.preventDefault();
		socket.emit("start_game");
	}

    render() {
        if (this.state.gameEnded) {
            return(<div></div>);
        } else {
            return(
                <div>
                    <div className={`self-container ${this.props.user == this.state.currUser ? "self-focus" : ""}`}>
                        <DiceContainer updateSelfScore={this.props.updateSelfScore} user={this.props.user}/>
                    </div>
                    {this.state.gameStarted == true ?
                    <div></div>:
                        <div id="dice-start-game-button-container">
                            <button id="dice-start-game-button" onClick={this.startGame}>
                                Start Game
                            </button>
                        </div>
                    }
                </div>
            )
        }
    }

}