import React from 'react'
import Modal from 'react-modal'
import SelfArea from './SelfArea'
import OpponentArea from './OpponentArea'
import Scorecard from './Scorecard'
import ChatArea from './ChatArea'
import '../styles/Board.css'

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selfScore: {
                ones: 0,
                twos: 0,
                threes: 0,
                fours: 0,
                fives: 0,
                sixes: 0,
                upperPreTotal: 0,
                upperBonus: 0,
                upperTotal: 0,
                threeKind: 0,
                fourKind: 0,
                fullHouse: 0,
                smStraight: 0,
                lgStraight: 0,
                yahtzee: 0,
                chance: 0,
                lowerTotal: 0,
                total: 0,
            },
            showModal: false,
            gameEndMsg: "",
        }
        this.updateSelfScore = this.updateSelfScore.bind(this);
        this.submitScore = this.submitScore.bind(this);

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleNewGame = this.handleNewGame.bind(this)

    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleNewGame() {
        window.location.reload(false);
    }

    updateSelfScore(score) {
        this.setState({
            selfScore: score
        });
    }

    submitScore() {
        const requestOpts = {
            method: 'POST',
            body: JSON.stringify({
                newScore: `${this.state.selfScore.total}`,
                user: `${this.props.user.username}`
            })
        };
        fetch(`http://127.0.0.1:5000/score`, requestOpts)
        .then(res => res.json())
        .then(
          resp => {
            this.setState({
                showModal: true,
                gameEndMsg: resp.message,
            });
          },
          err => {
            console.log("Error!"); //TODO
          }
        )
    }

    render() {
        return(
            <div id="board">
                <div id="board-top">
                    <Scorecard submitScore={this.submitScore} score={this.state.selfScore} user={this.props.user} />
                </div>
                <div id="board-bottom">
                    <div id="board-play">
                        <div id="board-oppo">
                            <OpponentArea />
                        </div>
                        <div id="board-self">
                            <SelfArea updateSelfScore={this.updateSelfScore} user={this.props.user} />
                        </div>
                    </div>
                    <div id="board-chat">
                        <ChatArea user={this.props.user} />
                    </div>
                </div>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Game end message"
                    className="board-modal"
                    overlayClassName="board-overlay"
                >
                    <div>
                        <h1>Game Over!</h1>
                        <p>{this.state.gameEndMsg}</p>
                        <div id="new-game-btn-container">
                            <button onClick={this.handleNewGame} id="new-game-btn">START A NEW GAME</button>
                        </div>
                        
                    </div>
                    
                </Modal>
            </div>
        )

        
    }
}
