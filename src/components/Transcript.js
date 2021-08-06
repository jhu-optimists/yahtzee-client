import React from 'react';
import { socket } from "../socket"

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
      <div>
        <p>Transcript:</p>
            {this.state.transcript.map((message, index)=>{
                return <p>{message}</p>
            })}
      </div>
    )
  }
}