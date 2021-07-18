import React from 'react'
import Die from './Die'
import '../styles/DiceContainer.css'

export default class DiceContainer extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			pips: [0,1,2,3,4],
			hold: [false, false, false, false, false],
		};

		this.rollDice = this.rollDice.bind(this);
		this.toggleDieStatus = this.toggleDieStatus.bind(this);
		this.generateScore = this.generateScore.bind(this)
	}

	rollDice() {
		let newPips = [...this.state.pips];
		for (let i = 0; i < 5; i++){
			if (!this.state.hold[i]) {
				const num = Math.floor(Math.random() * 6)
				newPips[i] = num
			}
		}
		this.setState({
			pips: newPips,
		});
	}

	toggleDieStatus(id) {
		let holds = this.state.hold;
		holds[id] = !holds[id];
		this.setState({
			hold: holds,
		});
	}

	// FOR SKELETAL DEMO
	generateScore(e) {
		e.preventDefault();
		const one = Math.floor(Math.random() * 5) + 1;
		const two = Math.floor(Math.random() * 10) + 1;
		const three =  Math.floor(Math.random() * 15) + 1;
		const four = Math.floor(Math.random() * 20) + 1;
		const five = Math.floor(Math.random() * 25) + 1;
		const six = Math.floor(Math.random() * 30) + 1;
		const upperP = one + two + three + four + five + six;
		const upperB = upperP >= 63 ? upperP + 35 : 0;
		const upperT = upperP + upperB;
		const threeK = Math.floor(Math.random() * 18) + 1;
		const fourK = Math.floor(Math.random() * 24) + 1;
		const ch = Math.floor(Math.random() * 30) + 1;
		const lowerT = threeK + fourK + ch + 105;
		const tot = lowerT + upperT

		const dummyScore = {
			ones: one,
			twos: two,
			threes: three,
			fours: four,
			fives: five,
			sixes: six,
			upperPreTotal: upperP,
			upperBonus: upperB,
			upperTotal: upperT,
			threeKind: threeK,
			fourKind: fourK,
			fullHouse: 25,
			smStraight:30,
			lgStraight: 0,
			yahtzee: 50,
			chance: ch,
			lowerTotal: lowerT,
			total: tot,
		}
		this.props.updateSelfScore(dummyScore)
	}

	render () {
		return (
			<div id="dice-area-container">
				<div id="dice-container">
					<Die id={0} pip={this.state.pips[0]} toggle={this.toggleDieStatus} hold={this.state.hold[0]} />
					<Die id={1} pip={this.state.pips[1]} toggle={this.toggleDieStatus} hold={this.state.hold[1]} />
					<Die id={2} pip={this.state.pips[2]} toggle={this.toggleDieStatus} hold={this.state.hold[2]} />
					<Die id={3} pip={this.state.pips[3]} toggle={this.toggleDieStatus} hold={this.state.hold[3]} />
					<Die id={4} pip={this.state.pips[4]} toggle={this.toggleDieStatus} hold={this.state.hold[4]} />
				</div>
				<div id="button-container">
					<button id="roll-button" onClick={this.rollDice}>
						ROLL
					</button>
				</div>
				<div id="dice-test-button-container">
					<button id="dice-test-button" onClick={this.generateScore}>
						TEST: FINISH GAME
					</button>
				</div>
			</div>
		)
	}
}

