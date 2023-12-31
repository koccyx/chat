import React from 'react';

function Message(props) {
  return (
    <div className={`message ${props.me == props.sender ? 'sent' : 'received'}`}>
      <div className="message-header">
        <span className="message-sender">{props.sender}</span>
        <div className="message-time sent-time">{props.time}</div>
      </div>
      <div className="message-text">{props.text}</div>
    </div>
  );
}

export default Message;