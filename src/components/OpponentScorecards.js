import React from 'react'
import { socket } from "../socket"
import '../styles/OpponentScorecards.css'

export default class OpponentScorecards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      scores: [],
      scoreList: [],
      showOpponents: false,
    };
  }

  getScorecardsArr(allScorecards) {
    const self = this;
    const scorecardsMap = new Map(Object.entries(allScorecards));
    const scorecardsArr = []
    function scorecardsToArray(scorePair, player, map) {
      const res = [];
      if (player != self.props.user) {
        res.push(player);
        for (const category in scorePair)
          res.push(scorePair[category])
        scorecardsArr.push(res)
      }
    }
    scorecardsMap.forEach(scorecardsToArray);
    return scorecardsArr;
  }

  componentDidMount() {
    const self = this;
    socket.on("broadcast_game_state", function(gameState) {
      const gameStateJson = JSON.parse(gameState);
      const scorecardsList = self.getScorecardsArr(gameStateJson["user_scorecard_map"])
      
      let showOppo = false;
      for (const list of scorecardsList)
        if (list.length > 1) { showOppo = true}
      
      self.setState({
        gameStarted: gameStateJson["has_game_started"],
        scores: Object.entries(gameStateJson["current_score_map"]),
        scoreList: scorecardsList,
        showOpponents: showOppo,
      }); 
    });
  }

  render() {
    return(
      <div>
        {console.log(this.props.user)}
        {(this.state.gameStarted && this.state.showOpponents) ?
          <table id="oppo-table">
            {this.state.scoreList.map((numList,i) =>(
              <tr key={i}>
              {
                numList.map((num,j)=>
                    <td key={j}>{num}</td>
                )
              }
              </tr>
          ))}
          </table>
          : <div></div>
        }
      </div>
    )
  }

}