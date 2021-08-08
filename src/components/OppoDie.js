import React from 'react'
import one from '../assets/one.png'
import two from '../assets/two.png'
import three from '../assets/three.png'
import four from '../assets/four.png'
import five from '../assets/five.png'
import six from '../assets/six.png'
import '../styles/OppoDie.css'

export default class Die extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		const diceImages = [one, two, three, four, five, six]
		return (
				<img className="oppo-die" src={diceImages[this.props.pip-1]} />
		)
	}
}