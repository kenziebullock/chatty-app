import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    // console.log('Rendering <MessageList />');
    
    const messageArray = this.props.messageList.map((message) => {
      return (
        <Message 
          key={message.id} 
          user={message.username} 
          content={message.content} 
          color={message.color}
        />)
    });
    
    return (
      <div>{messageArray}</div>
    )
  }
}

module.exports = MessageList;