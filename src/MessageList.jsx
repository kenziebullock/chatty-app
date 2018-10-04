import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {

  // scrolls to bottom
  scrollToBottom = () => {
    this.el.scrollIntoView({ behavior: "smooth" });
  }
  
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    console.log('Rendering <MessageList />');

    const messageArray = this.props.messageList.map((message) => {
      if (message.type === 'incomingNotification') {
        return(
          <div className="notification">
            <span className="notification-content">{message.content}</span>
          </div>
        )
      }
      
      return (
        <Message 
          key={message.id} 
          user={message.username} 
          content={message.content} 
          color={message.color}
        />)
    });
    
    return (
      <div>
        {messageArray}
        <div ref={el => { this.el = el; }} />
      </div>
    )
  }
}

module.exports = MessageList;