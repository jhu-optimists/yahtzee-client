import React from 'react';
import { socket } from "../socket"
import '../styles/Transcript.css'

export default class Transcript extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        transcript: []
    };
  }

  componentDidMount() {
    var self = this;
    socket.on("broadcast_game_state", function(gameState) {
      self.setState({
        transcript: JSON.parse(gameState)["transcript"]
      });
    });
  }

  render() {
    return (
      <div id="transcript-container">
        <div id="transcript-header">
          <span id="header-highlight">GAME TRANSCRIPT</span>
        </div>
        <div id="transcript-updates">
          {this.state.transcript.map((message, index)=>{
                return <p className="transcript-log-container"><span className="transcript-log">{message}</span></p>
          })}
        </div>
            
      </div>
    )
  }
}