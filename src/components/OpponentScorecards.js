import React from 'react'
import { socket } from "../socket"
import '../styles/OpponentScorecards.css'

export default class OpponentScorecards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      scores: [],
    };
  }

  componentDidMount() {
    var self = this;
    socket.on("broadcast_game_state", function(gameState) {
      const gameStateJson = JSON.parse(gameState);
      self.setState({
        gameStarted: gameStateJson["has_game_started"],
        scores: Object.entries(gameStateJson["current_score_map"]),
      }); 
    });
  }

  render() {
    return(
      <div>
        {console.log(this.state.scores)}
        {this.state.gameStarted ?
          this.state.scores.map((score, idx)=>{
            return <div className="scorecard-oppo">
              <p>{score[0]}: {score[1]}</p>
            </div>
          }):
          <div></div>
        }
      </div>
    )
  }

}