import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    console.log('Rendering <ChatBar />');
    return (
      <footer className="chatbar">
        <input 
          className="chatbar-username" 
          name="newMessageUser" 
          defaultValue={this.props.currentUser} 
          placeholder="Your Name (Optional)" 
          onKeyDown={this.props.checkKeyPress} />
        <input 
          className="chatbar-message" 
          name="newMessage" 
          placeholder="Type a message and hit ENTER" 
          onChange={this.props.handleChange}
          value={this.props.value}
          onKeyDown={this.props.checkKeyPress}/>
      </footer>
    )
  }
}

module.exports = ChatBar;
