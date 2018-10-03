import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  // set initial state
  constructor(props) {
    super(props);

    this.state = {
      messages: [], // messages from server will be stored here.
      currentUser: 'Anonymous',
      value: ''
    }
    // this.onSubmit = this.onSubmit.bind(this);
    this.getNewMessage = this.getNewMessage.bind(this);
    this.checkKeyPress = this.checkKeyPress.bind(this);
  }

  // onSubmit(e) {
  //   e.preventDefault();
  //   this.getNewMessage;
  // }

  checkKeyPress(e) {
    if (e.keyCode === 13) {
      // console.log('enter key pressed');
      // console.log(e.target.value);
      this.getNewMessage(e.target.value);
    }
  }

  getNewMessage(message) {
    console.log('in here');
    // event.preventDefault();
    // console.log(message);
    const newMessage = {username: this.state.currentUser, content: message};
    const messages = this.state.messages.concat(newMessage);
    console.log(this.socket);
    this.socket.send(JSON.stringify(newMessage));
    // this.setState({messages: messages})
  }

  componentDidMount() {
    console.log('componentDidMount <App />');

    const newSocket = new WebSocket('ws://localhost:3001');
    this.socket = newSocket;
    console.log(this.socket);
    // message when connected
    console.log('Connected to server');

    // could store socket connection in this.socket
    newSocket.onopen = (event) => {
      // newSocket.send('connection opened yo');
    }

  }

  render() {
    console.log('Rendering <App />');
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messageList={this.state.messages} />
        <ChatBar checkKeyPress={this.checkKeyPress} getNewMessage={this.getNewMessage} currentUser={this.state.currentUser} />
      </div>
    );
  }
}

export default App;
