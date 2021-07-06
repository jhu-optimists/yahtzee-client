import React from "react";
import { hot } from "react-hot-loader";
import one from '../assets/one.png';
import two from '../assets/two.png';
import three from '../assets/three.png';
import four from '../assets/four.png';
import five from '../assets/five.png';
import six from '../assets/six.png';

class Dice extends React.Component {
	holdDice = () => {
		this.props.toggleDiceHold(this.props.id);
	}

	render () {
		const dice = [one, two, three, four, five, six]
		return (
			<div className={`dice-container ${this.props.hold ? "hold" : "free"}`}>
				<img src={dice[this.props.pips]} onClick={this.holdDice} />
			</div>
		)
	}
}
export default hot(module)(Dice);