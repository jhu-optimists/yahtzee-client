import React from 'react'
import { socket } from "../socket"
import '../styles/Scorecard.css'

export default class Scorecard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: [],
      clicked: {
        ones: false,
        twos: false,
        threes: false,
        fours: false,
        fives: false,
        sixes: false,
        threeKind: false,
        fourKind: false,
        fullHouse: false,
        smStraight: false,
        lgStraight: false,
        yahtzee: false,
        chance: false
      },
      actualScore: {
        ones: 0,
        twos: 0,
        threes: 0,
        fours: 0,
        fives: 0,
        sixes: 0,
        upperPreTotal: 0,
        upperBonus: 0,
        upperTotal: 0,
        threeKind: 0,
        fourKind: 0,
        fullHouse: 0,
        smStraight: 0,
        lgStraight: 0,
        yahtzee: 0,
        chance: 0,
        lowerTotal: 0,
        total: 0
      },
      possibleScore: {
        ones: 0,
        twos: 0,
        threes: 0,
        fours: 0,
        fives: 0,
        sixes: 0,
        threeKind: 0,
        fourKind: 0,
        fullHouse: 0,
        smStraight: 0,
        lgStraight: 0,
        yahtzee: 0,
        chance: 0
      }
    };

    this.sendScore = this.sendScore.bind(this);
    this.endTurn = this.endTurn.bind(this);
    this.updatePossibleScore = this.updatePossibleScore.bind(this);
    this.updateActualScore = this.updateActualScore.bind(this);
    this.resetPossibleScore = this.resetPossibleScore.bind(this);
  }

  sendScore(e) {
    e.preventDefault();
    this.props.submitScore();
  }

  componentDidMount() {
    var self = this;
    socket.on("broadcast_game_state", function(gameState) {
      self.setState({
        gameState: JSON.parse(gameState)
      });
    });
    document.addEventListener(
			"diceRoll", 
			function(e) {
				self.updatePossibleScore(e.detail);
			}
		);
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

    this.updateActualScore(scoreType);
  }

  updateActualScore(scoreType) {
    if (scoreType == "ones") {
      this.setState({
        clicked: { ...this.state.clicked, ones: true },
        actualScore: { ...this.state.actualScore, ones: this.state.possibleScore.ones }
      }, function() {this.updateTotalScore();});
    }
    if (scoreType == "twos") {
      this.setState({
        clicked: { ...this.state.clicked, twos: true },
        actualScore: { ...this.state.actualScore, twos: this.state.possibleScore.twos }
      }, function() {this.updateTotalScore();});
    }
    if (scoreType == "threes") {
      this.setState({
        clicked: { ...this.state.clicked, threes: true },
        actualScore: { ...this.state.actualScore, threes: this.state.possibleScore.threes }
      }, function() {this.updateTotalScore();});
    }
    if (scoreType == "fours") {
      this.setState({
        clicked: { ...this.state.clicked, fours: true },
        actualScore: { ...this.state.actualScore, fours: this.state.possibleScore.fours }
      }, function() {this.updateTotalScore();});
    }
    if (scoreType == "fives") {
      this.setState({
        clicked: { ...this.state.clicked, fives: true },
        actualScore: { ...this.state.actualScore, fives: this.state.possibleScore.fives }
      }, function() {this.updateTotalScore();});
    }
    if (scoreType == "sixes") {
      this.setState({
        clicked: { ...this.state.clicked, sixes: true },
        actualScore: { ...this.state.actualScore, sixes: this.state.possibleScore.sixes }
      }, function() {this.updateTotalScore();});
    }

    if (scoreType == "threeKind") {
      this.setState({
        clicked: { ...this.state.clicked, threeKind: true },
        actualScore: { ...this.state.actualScore, threeKind: this.state.possibleScore.threeKind }
      }, function() {this.updateTotalScore();});
    }
    if (scoreType == "fourKind") {
      this.setState({
        clicked: { ...this.state.clicked, fourKind: true },
        actualScore: { ...this.state.actualScore, fourKind: this.state.possibleScore.fourKind }
      }, function() {this.updateTotalScore();});
    }
    if (scoreType == "fullHouse") {
      this.setState({
        clicked: { ...this.state.clicked, fullHouse: true },
        actualScore: { ...this.state.actualScore, fullHouse: this.state.possibleScore.fullHouse }
      }, function() {this.updateTotalScore();});
    }
    if (scoreType == "smStraight") {
      this.setState({
        clicked: { ...this.state.clicked, smStraight: true },
        actualScore: { ...this.state.actualScore, smStraight: this.state.possibleScore.smStraight }
      }, function() {this.updateTotalScore();});
    }
    if (scoreType == "lgStraight") {
      this.setState({
        clicked: { ...this.state.clicked, lgStraight: true },
        actualScore: { ...this.state.actualScore, lgStraight: this.state.possibleScore.lgStraight }
      }, function() {this.updateTotalScore();});
    }
    if (scoreType == "yahtzee") {
      this.setState({
        clicked: { ...this.state.clicked, yahtzee: true },
        actualScore: { ...this.state.actualScore, yahtzee: this.state.possibleScore.yahtzee }
      }, function() {this.updateTotalScore();});
    }
    if (scoreType == "chance") {
      this.setState({
        clicked: { ...this.state.clicked, chance: true },
        actualScore: { ...this.state.actualScore, chance: this.state.possibleScore.chance }
      }, function() {this.updateTotalScore();});
    }

  }

  updateTotalScore() {
    const upperP = 
      this.state.actualScore.ones + 
      this.state.actualScore.twos + 
      this.state.actualScore.threes + 
      this.state.actualScore.fours + 
      this.state.actualScore.fives + 
      this.state.actualScore.sixes;
    const upperB = upperP >= 63 ? upperP + 35 : 0;
    const upperT = upperP + upperB;

    const lowerT =
      this.state.actualScore.threeKind +
      this.state.actualScore.fourKind +
      this.state.actualScore.fullHouse +
      this.state.actualScore.smStraight + 
      this.state.actualScore.lgStraight + 
      this.state.actualScore.yahtzee + 
      this.state.actualScore.chance;
    const tot = lowerT + upperT

    this.setState({
      actualScore: {
        ...this.state.actualScore,
        upperPreTotal: upperP,
        upperBonus: upperB,
        upperTotal: upperT,
        lowerTotal: lowerT,
        total: tot
      }
    }, function() {
      // Send the total score to the server. Server broadcasts the turn end and the turn indicator listen for the broadcast.
      socket.emit("end_turn", this.props.user.username, this.state.actualScore.total);
      this.resetPossibleScore();
    });
  }

  resetPossibleScore() {
    this.setState({
      possibleScore: {
        ones: 0,
        twos: 0,
        threes: 0,
        fours: 0,
        fives: 0,
        sixes: 0,
        threeKind: 0,
        fourKind: 0,
        fullHouse: 0,
        smStraight: 0,
        lgStraight: 0,
        yahtzee: 0,
        chance: 0
      }
    });
    document.dispatchEvent(new Event("clearHeldDice"));
  }

  updatePossibleScore(diceValues) {
    const one = this.scoreSingleNumbers(1, diceValues);
    const two = this.scoreSingleNumbers(2, diceValues);
    const three = this.scoreSingleNumbers(3, diceValues);
    const four = this.scoreSingleNumbers(4, diceValues);
    const five = this.scoreSingleNumbers(5, diceValues);
    const six = this.scoreSingleNumbers(6, diceValues);

    const threeK = this.scoreThreeKind(diceValues);
    const fourK = this.scoreFourKind(diceValues);
    const scoreFullHouse = this.scoreFullHouse(diceValues);
    const scoreSmallStraight = this.scoreSmallStraight(diceValues);
    const scoreLargeStraight = this.scoreLargeStraight(diceValues);
    const scoreYahtzee = this.scoreYahtzee(diceValues);
    const ch = this.scoreChance(diceValues);

    this.setState({
      possibleScore: {
        ones: one,
        twos: two,
        threes: three,
        fours: four,
        fives: five,
        sixes: six,
        threeKind: threeK,
        fourKind: fourK,
        fullHouse: scoreFullHouse,
        smStraight: scoreSmallStraight,
        lgStraight: scoreLargeStraight,
        yahtzee: scoreYahtzee,
        chance: ch
      }
    });
  }

  scoreSingleNumbers(integer, diceValues) {
    let sum = 0;
    for (let idx in diceValues) {
      sum += diceValues[idx] == integer ? integer : 0;
    }
    return sum;
  }

  scoreThreeKind(diceValues) {
    let counts = this.getDiceValueCounts(diceValues);
    return counts.includes(3) || counts.includes(4) || counts.includes(5) ? this.getArraySum(diceValues) : 0;
  }

  scoreFourKind(diceValues) {
    let counts = this.getDiceValueCounts(diceValues);
    return counts.includes(4) || counts.includes(5) ? this.getArraySum(diceValues) : 0;
  }

  scoreFullHouse(diceValues) {
    let counts = this.getDiceValueCounts(diceValues);
    return counts.includes(2) && counts.includes(3) ? 25 : 0;
  }

  scoreSmallStraight(diceValues) {
    return (
      (diceValues.includes(1) && diceValues.includes(2) && diceValues.includes(3) && diceValues.includes(4)) || 
      (diceValues.includes(2) && diceValues.includes(3) && diceValues.includes(4) && diceValues.includes(5)) || 
      (diceValues.includes(3) && diceValues.includes(4) && diceValues.includes(5) && diceValues.includes(6))
      ) ? 30 : 0;
  }

  scoreLargeStraight(diceValues) {
    return (
      (diceValues.includes(1) && diceValues.includes(2) && diceValues.includes(3) && diceValues.includes(4) && diceValues.includes(5)) || 
      (diceValues.includes(2) && diceValues.includes(3) && diceValues.includes(4) && diceValues.includes(5) && diceValues.includes(6))
      ) ? 40 : 0;
  }

  scoreYahtzee(diceValues) {
    return this.getDiceValueCounts(diceValues).includes(5) ? 50 : 0;
  }

  scoreChance(diceValues) {
    return this.getArraySum(diceValues);
  }

  // Count the number of occurrences of each dice value. Index is the dice value. Value at index is the count.
  getDiceValueCounts(diceValues) {
    let diceValueCounts = [0];
    for (let diceValue = 1; diceValue < 7; diceValue++) {
      let diceValueCount = 0;
      for (let i = 0; i < diceValues.length; i++) {
        diceValueCount += diceValue == diceValues[i] ? 1 : 0;
      }
      diceValueCounts.push(diceValueCount);
    }
    return diceValueCounts;
  }

  getArraySum(arr) {
    return arr.reduce((a, b) => a + b, 0)
  }

  render() {
    return(
      <div>
        <table id="scorecard">
          <tr>
            <th className="first-col">Player</th>
            <th className="small-col">Ones</th>
            <th className="small-col">Twos</th>
            <th className="small-col">Threes</th>
            <th className="small-col">Fours</th>
            <th className="small-col">Fives</th>
            <th className="small-col">Sixes</th>
            <th>Total</th>
            <th>Bonus</th>
            <th>Upper Total</th>
            <th>Three Kind</th>
            <th>Four Kind</th>
            <th>Full House</th>
            <th>Small Straight</th>
            <th>Large Straight</th>
            <th>Yahtzee</th>
            <th>Chance</th>
            <th>Lower Total</th>
            <th id="total-col">TOTAL</th>
          </tr>
          <tr>
            <td className="first-col">{this.props.user.username}</td>
            { 
              this.state.clicked.ones
              ? <td>{this.state.actualScore.ones}</td>
              : <td><a onClick={((e) => this.endTurn(e, "ones"))}>{this.state.possibleScore.ones}</a></td>
            }
            { 
              this.state.clicked.twos
              ? <td>{this.state.actualScore.twos}</td>
              : <td><a onClick={((e) => this.endTurn(e, "twos"))}>{this.state.possibleScore.twos}</a></td>
            }
            { 
              this.state.clicked.threes
              ? <td>{this.state.actualScore.threes}</td>
              : <td><a onClick={((e) => this.endTurn(e, "threes"))}>{this.state.possibleScore.threes}</a></td>
            }
            { 
              this.state.clicked.fours
              ? <td>{this.state.actualScore.fours}</td>
              : <td><a onClick={((e) => this.endTurn(e, "fours"))}>{this.state.possibleScore.fours}</a></td>
            }
            { 
              this.state.clicked.fives
              ? <td>{this.state.actualScore.fives}</td>
              : <td><a onClick={((e) => this.endTurn(e, "fives"))}>{this.state.possibleScore.fives}</a></td>
            }
            { 
              this.state.clicked.sixes
              ? <td>{this.state.actualScore.sixes}</td>
              : <td><a onClick={((e) => this.endTurn(e, "sixes"))}>{this.state.possibleScore.sixes}</a></td>
            }
            <td>{this.state.actualScore.upperPreTotal}</td>
            <td>{this.state.actualScore.upperBonus}</td>
            <td>{this.state.actualScore.upperTotal}</td>
            { 
              this.state.clicked.threeKind
              ? <td>{this.state.actualScore.threeKind}</td>
              : <td><a onClick={((e) => this.endTurn(e, "threeKind"))}>{this.state.possibleScore.threeKind}</a></td>
            }
            { 
              this.state.clicked.fourKind
              ? <td>{this.state.actualScore.fourKind}</td>
              : <td><a onClick={((e) => this.endTurn(e, "fourKind"))}>{this.state.possibleScore.fourKind}</a></td>
            }
            { 
              this.state.clicked.fullHouse
              ? <td>{this.state.actualScore.fullHouse}</td>
              : <td><a onClick={((e) => this.endTurn(e, "fullHouse"))}>{this.state.possibleScore.fullHouse}</a></td>
            }
            { 
              this.state.clicked.smStraight
              ? <td>{this.state.actualScore.smStraight}</td>
              : <td><a onClick={((e) => this.endTurn(e, "smStraight"))}>{this.state.possibleScore.smStraight}</a></td>
            }
            { 
              this.state.clicked.lgStraight
              ? <td>{this.state.actualScore.lgStraight}</td>
              : <td><a onClick={((e) => this.endTurn(e, "lgStraight"))}>{this.state.possibleScore.lgStraight}</a></td>
            }
            { 
              this.state.clicked.yahtzee
              ? <td>{this.state.actualScore.yahtzee}</td>
              : <td><a onClick={((e) => this.endTurn(e, "yahtzee"))}>{this.state.possibleScore.yahtzee}</a></td>
            }
            { 
              this.state.clicked.chance
              ? <td>{this.state.actualScore.chance}</td>
              : <td><a onClick={((e) => this.endTurn(e, "chance"))}>{this.state.possibleScore.chance}</a></td>
            }
            <td>{this.state.actualScore.lowerTotal}</td>
            <td>{this.state.actualScore.total}</td>
          </tr>
          {
            

          }
        </table>
      </div>
    )
  }

}