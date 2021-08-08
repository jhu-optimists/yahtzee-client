import React from 'react';
import { socket } from "../socket"
import OpponentDice from './OpponentDice'
import '../styles/OpponentArea.css'

export default class OpponentArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        scores: [],
        gameStarted: false,
        currUser: '',
        diceVals: []
    };
  }

  componentDidMount() {
    var self = this;
    socket.on("broadcast_game_state", function(gameState) {
      let gameStateObject = JSON.parse(gameState);
      let currentScoreMap = gameStateObject["current_score_map"]
      let scoreMessage = [];

      Object.keys(currentScoreMap).forEach(function(key) {
        if (key == self.props.user.username) {
          return;
        }
        scoreMessage.push(key + ": " + currentScoreMap[key]);
      });

      self.setState({
        scores: scoreMessage,
        gameStarted: gameStateObject.has_game_started,
        currUser: gameStateObject.user_with_turn,
        diceVals: gameStateObject.dice_values
      });
    });
  }

  render() {
    return (
      <div className="opponent-container">
        {
          this.state.gameStarted ? 
            <OpponentDice username={this.props.user.username} currUser={this.state.currUser} diceVals={this.state.diceVals}/>:
            <div id="oppo-waiting-message">Waiting for someone to start the game...</div>
        }
        
        {/* <p>Opponent Scores:</p>
            {this.state.scores.map((score, index)=>{
                return <p>{score}</p>
            })} */}
      </div>
    )
  }
}