import React from 'react'
import Modal from 'react-modal'
import { socket } from "../socket"
import DiceContainer from "./DiceContainer.js"
import gameOver from '../assets/game-over.gif'
import '../styles/SelfArea.css'

export default class SelfArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currUser: '',
            gameStarted: false,
            gameEnded: false,
            winner: '',
            finalScores: [],
            newRecord: false,
        }
        this.startGame = this.startGame.bind(this);
        // this.handleOpenModal = this.handleOpenModal.bind(this);
        // this.handleNewGame = this.handleNewGame.bind(this)
    }

    componentDidMount() {
        var self = this;
        socket.on("broadcast_game_state", function(gameState) {
          let gameStateObject = JSON.parse(gameState);
          self.setState({
            currUser: gameStateObject.user_with_turn,
            gameStarted: gameStateObject.has_game_started,
            gameEnded: gameStateObject.has_game_ended,
            winner: gameStateObject.winner,
            finalScores: gameStateObject.final_scores,
            newRecord: gameStateObject.new_hall_record,
          });
        });
    }

    startGame(e) {
		e.preventDefault();
		socket.emit("start_game");
	}

    // handleNewGame() {
    //     fetch(`http://127.0.0.1:5000/refresh`, {method: "POST"})
    //     .then(res => res.json())
    //     .then(resp => {
    //         console.log(resp);
    //         window.location.reload(false);
    //         },
    //         err => {
    //             console.log("Error: " + err); // TODO
    //             alert("Server error: " + err["error_message"]);

    //         }
    //     )
    // }

    render() {
        if (this.state.gameEnded) {
            return(
                <Modal
                    isOpen={true}
                    contentLabel="Game end message"
                    className="self-modal"
                    overlayClassName="self-overlay"
                >
                    <div>
                        <div>
                            <img className="self-gif" src={gameOver}/>
                        </div>
                        <div className="self-results-heading">RESULTS</div>
                        <div>
                            {this.state.finalScores.map((scorePair) => (
                                <div className="self-score">{scorePair[0]}: {scorePair[1]}</div>
                            ))}
                        </div>
                        
                        {this.state.newRecord ?
                            <div className="self-hall">{this.state.winner} wins and sets a new Hall of Fame record!</div> :
                            <div className="self-winner">{this.state.winner} wins!</div>
                        }
                        {/* TODO START NEW GAME BUTTON
                            <div id="new-game-btn-container">
                                <button onClick={this.handleNewGame} id="new-game-btn">START A NEW GAME</button>
                            </div>
                        */}
                        
                    </div>
                </Modal>
            );
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