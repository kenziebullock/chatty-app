{/* <footer class="chatbar">
  <input class="chatbar-username" placeholder="Your Name (Optional)" />
  <input class="chatbar-message" placeholder="Type a message and hit ENTER" />
</footer> */}

import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
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
          onKeyDown={this.props.checkKeyPress}/>
      </footer>
    )
  }
}

module.exports = ChatBar;