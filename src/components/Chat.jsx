import React, { useEffect, useRef, useState } from 'react';
import { createDate } from '../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import Message from './Message';
import { useAuth } from '../hooks/useAuth';
import { useLoad } from '../hooks/useLoad';
import Socket from '../services/api/socket';
import {MessageSlice} from '../services/store/state/MessageSlice';

export default function Chat() {
  const {messages} = useSelector(state => state.messageReducer);
  const {isAuth, code, name} = useAuth();
  const ref = useRef(null);
  const [messagesNum, setMessagesNum] = useState(20);
  const dispatch = useDispatch();
  const {addMessage} = MessageSlice.actions;
  useLoad();
  
  const messageToState = (text) => {
    let data = JSON.parse(text);
    console.log(text);
    dispatch(addMessage({text: data.text, name: data.user.name, date: createDate(), id: data._id}));
  };

  useEffect(() => {
    // if (!messages.length) return;
    // setMessagesNum(messagesNum + 1);
    ref.current.scrollTop = ref.current.scrollHeight;
  },[messages]);

  useEffect(() => {
    if (!code) return;
    Socket.connect(code);
    
    Socket.addEvent(messageToState);
    
    // Socket.socket.onmessage = (e) => {
    //   dispatch(addMessage(e.data));
    //   console.log(e.data);
    // };
  }, [code]);


  const loadNewMessages = () => {
    if (messagesNum > 300) return;
    setMessagesNum(messagesNum + 20);
  };

  return (
  <div className="chat" ref={ref} onScroll={loadNewMessages}>
    {!isAuth && code != null ? '' : messages.map((item, idx) =>{
      if (messagesNum < idx) return;
      return <Message key={idx} sender={item.sender} text={item.text} time={item.time} me={name}/>;
    }
    ).reverse()}
  </div>);
}