import React from 'react'
import SelfArea from './SelfArea'
import OpponentArea from './OpponentArea'
import Scorecard from './Scorecard'
import ChatArea from './ChatArea'
import '../styles/Board.css'

export default class Board extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div id="board">
                <div id="board-top">
                    <Scorecard user={this.props.user} />
                </div>
                <div id="board-bottom">
                    <div id="board-play">
                        <div id="board-oppo">
                            <OpponentArea />
                        </div>
                        <div id="board-self">
                            <SelfArea user={this.props.user} />
                        </div>
                    </div>
                    <div id="board-chat">
                        <ChatArea />
                    </div>
                </div>
            </div>
        )

        
    }
}
