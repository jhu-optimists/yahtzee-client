import React from 'react'
import Board from './Board'
import StartScreen from './StartScreen'
import '../styles/App.css'

export default class App extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
        loggedIn: false,
        user: ""
    };
    this.logIn = this.logIn.bind(this);
  }


  logIn(user) {
    fetch(`http://127.0.0.1:5000/user?username=${user}`)
    .then(res => res.json())
    .then(
      userData => {
        let playerUsername = ""
        // console.log(typeof(userData), userData); debugging
        if (typeof(userData) == "object") {     // socket incoming message; user already exists
          if ("error_message" in userData && userData["error_message"] != "") {
            alert("Server error: " + userData["error_message"]);
            return;
          } else {
            playerUsername = userData["username"]
          }
        } else if (typeof(userData) == "string") { // REST incoming message; new user
          const resp = JSON.parse(userData)
          playerUsername = resp.username
        }
        
        this.setState({
          loggedIn: true,
          user: playerUsername
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
