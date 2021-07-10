import React from 'react'
import Board from './Board'
import StartScreen from './StartScreen'
import '../styles/App.css'

export default class App extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
        loggedIn: false,
    };

    this.logIn = this.logIn.bind(this);
  }

  logIn() {
    this.setState({
      loggedIn: true,
      username: "Bob"
    })
  }

  render() {
    return(
        <div className="app">
          {this.state.loggedIn ? <Board user={this.state.username} />: <StartScreen logIn={this.logIn} />}
        </div>
    )

  }
}
// export default App;
