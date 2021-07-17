import React from 'react'
import one from '../assets/one.png'
import two from '../assets/two.png'
import three from '../assets/three.png'
import four from '../assets/four.png'
import five from '../assets/five.png'
import six from '../assets/six.png'
import '../styles/Die.css'

export default class Die extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.toggle(this.props.id);
	}

	render () {
		const diceImages = [one, two, three, four, five, six]
		return (
			<div className="die-container">
				<img className={`die ${this.props.hold ? "hold" : "free"}`} src={diceImages[this.props.pip]} onClick={this.handleClick} />
			</div>
		)
	}
}