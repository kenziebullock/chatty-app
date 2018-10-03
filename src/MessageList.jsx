import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    const messageArray = this.props.messageList.map((message) => {
      return <Message key={message.id} user={message.username} content={message.content} />
    });
    
    return (
      <div>{messageArray}</div>
    )
  }
}

module.exports = MessageList;