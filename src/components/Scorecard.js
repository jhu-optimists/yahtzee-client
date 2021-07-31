import React from 'react'
import '../styles/Scorecard.css'
import { socket } from "../socket"

export default class Scorecard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clickedOnes: false,
      gameState: []
    };

    this.sendScore = this.sendScore.bind(this);
    this.endTurn = this.endTurn.bind(this);
    this.computeScore = this.computeScore.bind(this);
  }

  sendScore(e) {
    e.preventDefault();
    this.props.submitScore();
  }

  componentDidMount() {
    var self = this;
    socket.on("broadcast_game_state", function(gameState) {
      console.log("GameState from Scorecard: " + gameState);
      self.setState({
        gameState: JSON.parse(gameState)
      });
    });
  }

  endTurn(e, scoreType) {
    e.preventDefault();
    if (this.state.gameState["has_game_started"] == false) {
      alert("Game has not started.");
      return;
    }
    if (this.props.user.username != this.state.gameState["user_with_turn"]) {
      alert("It's not your turn.");
      return;
    }

    // send the scores to the server. server broadcasts the turn end and the turn indicator listen for the broadcast
    socket.emit("end_turn", this.props.user.username, this.computeScore());
    if (scoreType == "ones") {
      this.setState({
        clickedOnes: true
      });
    }
  }

  computeScore() {
    // Add scoring function here. Will be a function of the dice values. Dice values can be broadcast from the server.
    return 5;
  }

  render() {
    return(
      <div>
        <table id="scorecard">
          <tr>
            <th className="first-col">Player</th>
            <th className="small-col">1s</th>
            <th className="small-col">2s</th>
            <th className="small-col">3s</th>
            <th className="small-col">4s</th>
            <th className="small-col">5s</th>
            <th className="small-col">6s</th>
            <th>Bonus</th>
            <th>Upper Total</th>
            <th>3 Kind</th>
            <th>4 Kind</th>
            <th>Full House</th>
            <th>Sm Straight</th>
            <th>Lg Straight</th>
            <th>Yahtzee</th>
            <th>Chance</th>
            <th>Lower Total</th>
            <th id="total-col">TOTAL</th>
          </tr>
          <tr>
            <td className="first-col">{this.props.user.username}</td>
            { // One way of handling the clicks on the scores.
              this.state.clickedOnes
              ? <td>{this.props.score.ones}</td>
              : <td><a onClick={((e) => this.endTurn(e, "ones"))}>{this.props.score.ones}</a></td>
            }
            
            <td onClick={this.endTurn}><a>{this.props.score.twos}</a></td>
            <td onClick={this.endTurn}><a>{this.props.score.threes}</a></td>
            <td onClick={this.endTurn}><a>{this.props.score.fours}</a></td>
            <td onClick={this.endTurn}><a>{this.props.score.fives}</a></td>
            <td onClick={this.endTurn}><a>{this.props.score.sixes}</a></td>
            <td>{this.props.score.upperBonus}</td>
            <td>{this.props.score.upperTotal}</td>
            <td onClick={this.endTurn}><a>{this.props.score.threeKind}</a></td>
            <td onClick={this.endTurn}><a>{this.props.score.fourKind}</a></td>
            <td onClick={this.endTurn}><a>{this.props.score.fullHouse}</a></td>
            <td onClick={this.endTurn}><a>{this.props.score.smStraight}</a></td>
            <td onClick={this.endTurn}><a>{this.props.score.lgStraight}</a></td>
            <td onClick={this.endTurn}><a>{this.props.score.yahtzee}</a></td>
            <td onClick={this.endTurn}><a>{this.props.score.chance}</a></td>
            <td>{this.props.score.lowerTotal}</td>
            <td onClick={this.sendScore}>
              <a>{this.props.score.total}</a>
            </td>
          </tr>
        </table>
      </div>
    )
  }

    
}