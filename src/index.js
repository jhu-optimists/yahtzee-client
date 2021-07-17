import React from 'react'
import ReactDOM from 'react-dom'
import { SocketContext, socket } from './socket'
import App from './components/App'

ReactDOM.render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <App />
    </SocketContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
