import React, {Component} from 'react';

class Message extends Component {
  render() {
    //console.log('Rendering </Message>')
    
    return (
      <div className="message">
          <span style={{color: this.props.color}} className="message-username">{this.props.user}</span>
          <span className="message-content">{this.props.content}</span>
      </div>
    )
  }
}

module.exports = Message;