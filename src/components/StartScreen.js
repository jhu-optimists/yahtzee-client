import React from 'react';
import dice from '../assets/dice.png'
import '../styles/StartScreen.css'

export default class StartScreen extends React.Component  {
    constructor(props) {
        super(props);
    
        this.state = {
            showMessage: false,
            userName: "",
        };

        this.onEnter = this.onEnter.bind(this);
        this.onLeave = this.onLeave.bind(this);
        this.changeUser = this.changeUser(this);
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

    changeUser() {
        this.setState({
            userName: "TBD"
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

                <div>
                    Enter your username:
                    <input onChange={} type="text"></input>    
                </div>    
                </div>
            </div>
        )
    }
}