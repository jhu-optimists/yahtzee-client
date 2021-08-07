import React from 'react';
import { socket } from "../socket"

export default class OpponentArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        scores: []
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
        scoreMessage.push(key + ": " + currentScoreMap[key]["total"]);
      });

      self.setState({
        scores: scoreMessage
      });
    });
  }

  render() {
    return (
      <div>
        <p>Opponent Scores:</p>
            {this.state.scores.map((score, index)=>{
                return <p>{score}</p>
            })}
      </div>
    )
  }
}