import React from 'react';
import Modal from 'react-modal';
import dice from '../assets/dice.png'
import '../styles/StartScreen.css'

export default class StartScreen extends React.Component  {
    constructor(props) {
        super(props);
    
        this.state = {
            showMessage: false,
            username: "",
            showModal: false,
        };

        this.onEnter = this.onEnter.bind(this);
        this.onLeave = this.onLeave.bind(this);
        this.showLogIn = this.showLogIn.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }
      
    closeModal() {
        this.setState({ showModal: false });
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

    handleLogIn(e) {
        e.preventDefault();
        this.setState({ showModal: false });
        this.props.logIn(this.state.username);
    }

    changeUser(event) {
        this.setState({
            username: event.target.value,
        });
    }

    showLogIn() {
        this.setState({ showModal: true });
    }

    render() {
        return(
            <div>
                <div className="start">
                    <h1>Y++ Optimists Edition</h1>
                    <img src={dice} alt="dice" className="dice"
                        onMouseEnter={this.onEnter}
                        onMouseLeave={this.onLeave}
                        onClick={this.showLogIn}
                    />
                    {this.state.showMessage ?
                        <div className="message">
                            Start Game!
                        </div>
                        : <div></div>
                    }
                <Modal 
                    isOpen={this.state.showModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Log in to game"
                    className="Modal"
                    overlayClassName="Overlay"
                >
                    <form id="login-form" onSubmit={this.handleLogIn}>
                        <div id="login-label">
                            <label>Enter your username:</label>
                        </div>

                            <input id="login-textbox" value={this.state.userName} onChange={this.changeUser.bind(this)} type="text"/>

                        <div>
                            <input id="login-button" type="submit" value="Let's Go!" /> 
                        </div>               
                    </form>    
                </Modal>
               
                </div>
            </div>
        )
    }
}