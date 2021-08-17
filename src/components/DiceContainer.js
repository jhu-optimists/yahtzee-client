import React from 'react'
import Die from './Die'
import '../styles/DiceContainer.css'
import { socket } from "../socket"

export default class DiceContainer extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			pips: [0,1,2,3,4],
			hold: [false, false, false, false, false],
			gameState: []
		};

		this.rollDice = this.rollDice.bind(this);
		this.toggleDieStatus = this.toggleDieStatus.bind(this);
	}

	rollDice() {
		let newPips = [...this.state.pips];
		for (let i = 0; i < 5; i++) {
			if (!this.state.hold[i]) {
				const num = Math.floor(Math.random() * 6)
				newPips[i] = num
			}
		}
		this.setState({
			pips: newPips,
		});
		if (this.props.user == this.state.gameState["user_with_turn"]) {
			// Send the dice values to the server for logging.
			socket.emit("dice_values", newPips.map(n => n + 1));
		}
		document.dispatchEvent(new CustomEvent("diceRoll", { detail: newPips.map(n => n + 1) }));
	}

	toggleDieStatus(id) {
		let holds = this.state.hold;
		holds[id] = !holds[id];
		this.setState({
			hold: holds,
		});
	}

	componentDidMount() {
		var self = this;
		socket.on("broadcast_game_state", function(gameState) {
			self.setState({
				gameState: JSON.parse(gameState)
			});
		});
		// When the turn ends, we clear the held dice.
		document.addEventListener(
			"clearHeldDice", 
			function() {
				self.setState({
					hold: [false, false, false, false, false]
				});
			}
		);
	}

	render () {
		return (
			<div id="dice-area-container">
				{
					(this.state.gameState["has_game_started"]) &&
					(this.props.user == this.state.gameState["user_with_turn"]) ?
					<div id="dice-roll-count">
						Rolls left: <span id="dice-roll-val">{3 - this.state.gameState.dice_roll_count}</span>
					</div>:
					<div></div>
				}
				<div id="dice-container">
					<Die id={0} pip={this.state.pips[0]} toggle={this.toggleDieStatus} hold={this.state.hold[0]} />
					<Die id={1} pip={this.state.pips[1]} toggle={this.toggleDieStatus} hold={this.state.hold[1]} />
					<Die id={2} pip={this.state.pips[2]} toggle={this.toggleDieStatus} hold={this.state.hold[2]} />
					<Die id={3} pip={this.state.pips[3]} toggle={this.toggleDieStatus} hold={this.state.hold[3]} />
					<Die id={4} pip={this.state.pips[4]} toggle={this.toggleDieStatus} hold={this.state.hold[4]} />
				</div>
				{
					(this.state.gameState["has_game_started"]) &&
					(this.props.user == this.state.gameState["user_with_turn"]) &&
					(this.state.gameState["dice_roll_count"] < 3)
					 ?
					<div id="button-container">
						<button id="roll-button" onClick={this.rollDice}>
							R O L L !
						</button>
					</div>:
					<div></div>
				}		
			</div>
		)
	}
}

