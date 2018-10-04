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
      value: '',
      users: 0
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.getNewMessage = this.getNewMessage.bind(this);
    this.checkKeyPress = this.checkKeyPress.bind(this);
  }

  checkKeyPress(e) {
    // e.preventDefault();
    console.log('yup');
    // this.setState({value: e.target.value});
    if (e.keyCode === 13) {
      // console.log('enter key pressed');
      // console.log(e.target.value);
      console.log('in checkKeyPress')
      if (e.target.name === 'newMessageUser') {
        this.setUsername(e.target.value)
      } else {
        this.getNewMessage(e.target.value);
      }
    }
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }

  setUsername(newUser) {
    // console.log('in setUsername');
    let changeUser = {type: 'postNotification', content: `${this.state.currentUser} has changed their name to ${newUser}`}
    this.setState({currentUser: newUser});
    this.socket.send(JSON.stringify(changeUser));

  }

  getNewMessage(message) {
    // console.log('in getNewMessage');
    
    const newMessage = {type: 'postMessage', username: this.state.currentUser, content: message};
    // const messages = this.state.messages.concat(newMessage);
    
    this.socket.send(JSON.stringify(newMessage));
    this.setState({value: ''});
    // this.setState({messages: messages})
  }

  componentDidMount() {
    console.log('componentDidMount <App />');

    // connect to websocket
    const newSocket = new WebSocket('ws://localhost:3001');
    this.socket = newSocket;
    
    // message when connected
    console.log('Connected to server');

    
    newSocket.onmessage = (event) => {  
      // console.log('Message received', event);

      // set user counter
      if (event.data == parseInt(event.data, 10)) {
        this.setState({users: event.data})
      } else { // add messages to state
        let aMessage = JSON.parse(event.data);
        const messages = this.state.messages.concat(aMessage);
        this.setState({messages: messages});
      }
    }

  }

  render() {
    console.log('Rendering <App />');
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span>{this.state.users} users online</span>
        </nav>
        <MessageList messageList={this.state.messages} />
        <ChatBar handleChange={this.handleChange} value={this.state.value} checkKeyPress={this.checkKeyPress} getNewMessage={this.getNewMessage} currentUser={this.state.currentUser} />
      </div>
    );
  }
}

export default App;
