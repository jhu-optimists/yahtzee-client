import React from 'react'
import '../styles/Scorecard.css'

export default class Scorecard extends React.Component {
  constructor(props) {
    super(props)
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
            <td className="first-col">{this.props.user}</td>
            <td>6</td>
            <td>12</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    )
  }

    
}