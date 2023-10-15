import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';

export default function Chat() {
  const {messages} = useSelector(state => state.messageReducer);

  const ref = useRef(null);

  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  },[messages]);

  return (
  <div className="chat" ref={ref}>
    {messages.map((item, idx) => (
      <Message key={idx} sender={'Me'} text={item.text} />
    ))}
  </div>);
}