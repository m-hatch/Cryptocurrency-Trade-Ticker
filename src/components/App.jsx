import React from 'react';
import Header from './Header';
import Connection from './Connection';
import Dashboard from './Dashboard';

export default class App extends React.Component {

  constructor() {
    super();
    this.socket;

    // initialize state
    this.state = {
      socketStatus: 'Connecting...',
      isConnected: null,
      message: null
    };

    // bind methods
    this.createWebSocket = this.createWebSocket.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

    if(message.data) {
      this.setState({
        message: message.data
      });
    }

    if (!message.data) {
      console.log(message);
    }
  }

  onClose(event) {
    this.setState({
      socketStatus: 'Disconnected from WebSocket.',
      isConnected: false
    });
  }

  onError(error) {
    console.log('WebSocket Error: ' + error);
  }

  handleClick(event) {
    const btn = event.target.id;

    if (btn === 'open')
      this.createWebSocket();

    if (btn === 'close')
      this.socket.close();
  }

  render() {
    return (
      <div className="app">

        <Header status={ this.state.socketStatus } 
          connected={ this.state.isConnected } />

        <Connection handleClick={ this.handleClick } />

        <Dashboard message={ this.state.message } />

      </div>
    );
  }
  
}
