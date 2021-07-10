import React from 'react';
import dice from '../assets/dice.png'
import '../styles/StartScreen.css'

export default class StartScreen extends React.Component  {
    constructor(props) {
        super(props);
    
        this.state = {
            showMessage: false,
        };

        this.onEnter = this.onEnter.bind(this);
        this.onLeave = this.onLeave.bind(this);
    }

    onEnter() {
        this.setState({
            showMessage: true,
        })
    }

    onLeave() {
        this.setState({
            showMessage: false,
        })
    }

    render() {
        return(
            <div>
                <div className="start">
                    <h1>Y++ Optimists Edition</h1>
                    <img src={dice} alt="dice" className="dice"
                        onMouseEnter={this.onEnter}
                        onMouseLeave={this.onLeave}
                        onClick={this.props.logIn}
                    />
                    {this.state.showMessage ?
                        <div className="message">
                            Start Game!
                        </div>
                        : <div></div>
                    }
                </div>
            </div>
        )
    }
}