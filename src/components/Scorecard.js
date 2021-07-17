import React from 'react'
import '../styles/Scorecard.css'

export default class Scorecard extends React.Component {
  constructor(props) {
    super(props);
    this.sendScore = this.sendScore.bind(this);
  }

  sendScore(e) {
    e.preventDefault();
    this.props.submitScore();
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
            <th>Total</th>
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
            <td>{this.props.score.ones}</td>
            <td>{this.props.score.twos}</td>
            <td>{this.props.score.threes}</td>
            <td>{this.props.score.fours}</td>
            <td>{this.props.score.fives}</td>
            <td>{this.props.score.sixes}</td>
            <td>{this.props.score.upperPreTotal}</td>
            <td>{this.props.score.upperBonus}</td>
            <td>{this.props.score.upperTotal}</td>
            <td>{this.props.score.threeKind}</td>
            <td>{this.props.score.fourKind}</td>
            <td>{this.props.score.fullHouse}</td>
            <td>{this.props.score.smStraight}</td>
            <td>{this.props.score.lgStraight}</td>
            <td>{this.props.score.yahtzee}</td>
            <td>{this.props.score.chance}</td>
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