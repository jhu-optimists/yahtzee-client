import React from 'react';
import './Board.css';
import PlayArea from './PlayArea';
import Scorecard from './Scorecard';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="board">
                <Scorecard />
                <PlayArea />
            </div>
        )

        
    }
}
