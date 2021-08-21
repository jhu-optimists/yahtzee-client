import React from 'react'
import Modal from 'react-modal';
import { socket } from "../socket"
import SelfArea from './SelfArea'
import OpponentArea from './OpponentArea'
import Scorecard from './Scorecard'
import OpponentScorecards from './OpponentScorecards'
import ChatArea from './ChatArea'
import Transcript from './Transcript'
import '../styles/Board.css'
import arrow from '../assets/arrow.png'

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
            records: [],
        }
        this.updateSelfScore = this.updateSelfScore.bind(this);
        this.submitScore = this.submitScore.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    updateSelfScore(score) {
        this.setState({
            selfScore: score
        });
    }

    handleOpenModal () {
        fetch(`http://127.0.0.1:5000/hall`)
        .then(res => res.json())
        .then(
          resp => {
            this.setState({
                records: resp.records,
                showModal: true,
            });
          },
          err => {
            console.log("Error!"); //TODO
          }
        )
    }
      
    closeModal() {
        this.setState({ showModal: false });
    }

    submitScore() {
        const requestOpts = {
            method: 'POST',
            body: JSON.stringify({
                newScore: `${this.state.selfScore.total}`,
                user: `${this.props.user}`
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

    componentDidMount() {
        socket.emit("join");
        socket.emit("get_user_with_current_turn");
    }

    render() {
        return(
            <div id="board">
                <div id="board-top">
                    <Scorecard submitScore={this.submitScore} score={this.state.selfScore} user={this.props.user} />
                    <OpponentScorecards user={this.props.user} />
                </div>
                <div id="board-bottom">
                    <div id="board-transcript">
                        <Transcript />
                    </div>
                    <div id="board-play">
                        <div id="board-oppo">
                            <OpponentArea user={this.props.user} />
                        </div>
                        <div id="board-self">
                            <SelfArea updateSelfScore={this.updateSelfScore} user={this.props.user} />
                        </div>
                        <div id="board-arrow-container">
                            <img onClick={this.handleOpenModal} id="board-arrow" src={arrow}/>
                        </div>
                    </div>
                    <div id="board-chat">
                        <ChatArea user={this.props.user} />
                    </div>
                </div> 
                <Modal 
                    isOpen={this.state.showModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Show records"
                    className="board-modal"
                    overlayClassName="board-modal-overlay"
                >
                    <h1>Y++ Hall of Fame</h1>
                    <table id="board-hall-table">
                        <tr>
                            <th>RANK</th>
                            <th>PLAYER</th>
                            <th>SCORE</th>
                        </tr>
                        {this.state.records.map((numList,i) =>(
                            <tr key={i}>
                                <td>{i+1}</td>
                            {
                                numList.map((num,j)=>
                                    <td key={j}>{num}</td>
                                )
                            }
                            </tr>
                        ))}
                    </table>
                    <div id="board-personal">
                        <h3>Your Personal Best: <span id="board-personal-score">{this.props.highScore}</span></h3>
                    </div>
                    <button id="board-modal-button" onClick={this.closeModal}>
                        CLOSE
                    </button>
                </Modal>       
            </div>
        )

        
    }
}
