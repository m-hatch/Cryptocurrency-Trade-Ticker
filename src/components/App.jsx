import React from 'react';
import Header from './Header';

export default class App extends React.Component {

  constructor() {
    super();
    this.socket;
    this.state = {
      socketStatus: 'Connecting...',
      isConnected: null
    };
    this.createWebSocket = this.createWebSocket.bind(this);
    this.onOpen = this.onOpen.bind(this);
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
    this.setState({
      socketStatus: `Connected to: ${event.currentTarget.url}`,
      isConnected: true
    });
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

        <Header status={ this.state.socketStatus } 
          connected={ this.state.isConnected } />

      </div>
    );
  }
  
}
