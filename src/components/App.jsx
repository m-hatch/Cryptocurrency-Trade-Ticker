import React from 'react';

export default class App extends React.Component {

  constructor() {
    super();
    this.socket;
    this.state = {};
    this.createWebSocket = this.createWebSocket.bind(this);
  }

  componentDidMount() {
    this.createWebSocket();
  }

  createWebSocket() {
    let socket = new WebSocket('wss://www.bitmex.com/realtime?subscribe=trade');
    socket.onerror = this.onError;
    socket.onopen = this.onOpen;
    socket.onclose = this.onClose;
    socket.onmessage = this.onMessage;
    this.socket = socket;
  }

  onOpen(event) {
    console.log('Connected to: ' + event.currentTarget.url);
  }

  onMessage(event) {
    const message = JSON.parse(event.data);
    const data = message.data;
    console.log(message.data);
  }

  onClose(event) {
    console.log('Disconnected from WebSocket.');
  }

  onError(error) {
    console.log('WebSocket Error: ' + error);
  }

  render() {
    return (
      <div className="app">

        <div className="header">
          <h1 className="header__title">Realtime Cryptocurrency Trade Ticker</h1>
          <span id="js-status">Connecting...</span>
        </div>

      </div>
    );
  }
  
}
