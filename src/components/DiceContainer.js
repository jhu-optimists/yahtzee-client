import React from "react"
import { hot } from "react-hot-loader"
import Dice from "./DiceContainer.js"

class DiceContainer extends React.Component {
	state = {
		roll: 0,
		pips: [0,0,0,0,0],
		hold: [false, false, false, false, false],
	}


	// (callback from Dice.js)
	toggleDiceHold = (id) => {
		if (this.state.roll !== 0) {
			let holds = this.state.hold
			holds[id] = !holds[id]
			this.setState({hold: holds})
		}
	}

	// (callback from RollButton.js)
	handleRollClick = () => {
		this.newRoll()
	}


	newRoll = () => {
		const rollCount = this.state.roll
		this.setState({roll: rollCount + 1})
		this.rollDice()
	}

	rollDice = () => {
		let newPips = [...this.state.pips];
		for (let i = 0; i < 5; i++){
			if (!this.state.hold[i]) {
				const num = Math.floor(Math.random() * 6)
				newPips[i] = num
			}
		}
		this.setState({pips: newPips})
	}

	render () {
		return (
			<div className="app-container">
				<div className="dice-area">
					<div className="dice-bar">
						<Dice id={0} pips={this.state.pips[0]} hold={this.state.hold[0]} toggleDiceHold={this.toggleDiceHold} />
						<Dice id={1} pips={this.state.pips[1]} hold={this.state.hold[1]} toggleDiceHold={this.toggleDiceHold} />
						<Dice id={2} pips={this.state.pips[2]} hold={this.state.hold[2]} toggleDiceHold={this.toggleDiceHold} />
						<Dice id={3} pips={this.state.pips[3]} hold={this.state.hold[3]} toggleDiceHold={this.toggleDiceHold} />
						<Dice id={4} pips={this.state.pips[4]} hold={this.state.hold[4]} toggleDiceHold={this.toggleDiceHold} />
					</div>	
				</div>
			</div>
		)
	}
}

export default hot (module)(DiceContainer);