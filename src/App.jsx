import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  // set initial state
  constructor(props) {
    super(props);

    this.state = {
      messages: [
      {
        username: "Bob",
        content: "Has anyone seen my marbles?",
        id: 1
      },
      {
        username: "Anonymous",
        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
        id: 2
      }
    ],
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
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
  }

  componentDidMount() {
    // console.log('componentDidMount <App />');
    // setTimeout(() => {
    //   console.log('Simulating incoming message');
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = { id: 3, username: 'Michelle', content: 'Hello there!'};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
  }

  render() {
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
