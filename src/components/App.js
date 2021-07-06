import React from 'react';
import { Button } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Board from './Board';
import StartScreen from './StartScreen'
import './App.css';

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
    })
  }

  render() {
    const theme = createTheme({
      palette: {
        primary: {
          main: '#3F51B5',
        },
        secondary: {
          main: '#3D5AFE',
        },
      },
    });

    return(
      <ThemeProvider theme={theme}>
        <div className="app">
          {this.state.loggedIn ? <Board />: <StartScreen logIn={this.logIn} />}
        </div>
      </ThemeProvider>
    )

  }
}
// export default App;
