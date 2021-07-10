import React from 'react'
import Die from './Die'
import '../styles/DiceContainer.css'

export default class DiceContainer extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			pips: [0,1,2,3,4,5],
			hold: [false, false, false, false, false],
		};

		this.rollDice = this.rollDice.bind(this);
		this.toggleDieStatus = this.toggleDieStatus.bind(this);
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

	render () {
		console.log(this.state.pips);
		return (
			<div id="dice-area-container">
				<div id="dice-container">
					<Die id={0} pip={this.state.pips[0]} toggle={this.toggleDieStatus} hold={this.state.hold[0]} />
					<Die id={1} pip={this.state.pips[1]} toggle={this.toggleDieStatus} hold={this.state.hold[1]} />
					<Die id={2} pip={this.state.pips[2]} toggle={this.toggleDieStatus} hold={this.state.hold[2]} />
					<Die id={3} pip={this.state.pips[3]} toggle={this.toggleDieStatus} hold={this.state.hold[3]} />
					<Die id={4} pip={this.state.pips[4]} toggle={this.toggleDieStatus} hold={this.state.hold[4]} />
					<Die id={5} pip={this.state.pips[5]} toggle={this.toggleDieStatus} hold={this.state.hold[5]} />
				</div>
				<div id="button-container">
					<button id="roll-button" onClick={this.rollDice}>
						ROLL
					</button>
				</div>
			</div>
		)
	}
}

