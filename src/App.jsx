import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  // set initial state
  constructor(props) {
    super(props);

    // setting state for app
    this.state = {
      messages: [], // messages from server will be stored here.
      currentUser: 'Anonymous',
      value: '',
      color: '',
      users: 0
    }
    
    //binding functions to components
    this.usernameColor = this.usernameColor.bind(this);
    this.handleChange  = this.handleChange.bind(this);
    this.setUsername   = this.setUsername.bind(this);
    this.getNewMessage = this.getNewMessage.bind(this);
    this.checkKeyPress = this.checkKeyPress.bind(this);
  }

  // check if enter key is pressed
  checkKeyPress(e) {
    if (e.keyCode === 13) {
      // console.log('in checkKeyPress')
      if (e.target.name === 'newMessageUser') {
        this.setUsername(e.target.value)
      } else {
        this.getNewMessage(e.target.value);
      }
    }
  }

  // handle message form changes
  handleChange(e) {
    this.setState({value: e.target.value})
  }

  // function
  setUsername(newUser) {
    // console.log('in setUsername');
    let changeUser = {type: 'postNotification', content: `${this.state.currentUser} has changed their name to ${newUser}`}
    this.setState({currentUser: newUser});
    this.socket.send(JSON.stringify(changeUser));
  }

  getNewMessage(message) {
    // console.log('in getNewMessage');
    
    const newMessage = {
      type: 'postMessage', 
      username: this.state.currentUser, 
      content: message, 
      color: this.state.color
    };
    // const messages = this.state.messages.concat(newMessage);
    
    this.socket.send(JSON.stringify(newMessage));
    this.setState({value: ''});
    // this.setState({messages: messages})
  }

  usernameColor() {
    const colors = ['blue', 'green', 'purple', 'orange', 'hotpink', 'tomato', 'gold', 'darkgreen', 'aqua', 'gray'];
    const index = Math.floor(Math.random() * Math.floor(9));
    this.setState({color: colors[index]});
  }

  componentDidMount() {
    // console.log('componentDidMount <App />');

    // connect to websocket
    const newSocket = new WebSocket('ws://localhost:3001');
    this.socket = newSocket;
    
    // set random user color
    newSocket.onopen = (e) => {
      // console.log('Connected to server');
      this.usernameColor(); 
    }

    // message handler
    newSocket.onmessage = (event) => {  
      // console.log('Message received', event);
      
      // set user counter
      if (event.data == parseInt(event.data, 10)) {
        this.setState({users: event.data})
      } 
      
      let data = JSON.parse(event.data);
      switch(data.type) {
        case 'incomingMessage':
          const messages = this.state.messages.concat(data);
          this.setState({messages: messages});
          break;
        case 'incomingNotification':
          const notifications = this.state.messages.concat(data);
          this.setState({messages: notifications});
          break;
      } 
    }
  }

  render() {
    // console.log('Rendering <App />');
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Socket Chat</a>
          <span>{this.state.users} users online</span>
        </nav>
        <MessageList 
          messageList={this.state.messages}
          notifications={this.state.notifications}
          />
        <ChatBar 
          handleChange={this.handleChange} 
          value={this.state.value} 
          checkKeyPress={this.checkKeyPress} 
          getNewMessage={this.getNewMessage} 
          currentUser={this.state.currentUser} />
      </div>
    );
  }
}

export default App;
