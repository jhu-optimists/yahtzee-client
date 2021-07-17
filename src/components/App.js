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


  logIn(user) {
    fetch(`http://127.0.0.1:5000/user?username=${user}`)
    .then(res => res.json())
    .then(
      userData => {
        this.setState({
          loggedIn: true,
          user: userData
        });
      },
      err => {
        console.log("Error!"); // TODO
      }
    )
  }

  render() {
    return(
        <div className="app">
          {this.state.loggedIn ? <Board user={this.state.user} />: <StartScreen logIn={this.logIn} />}
        </div>
    )

  }
}
// export default App;
