import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MessageSlice } from '../services/store/state/MessageSlice';
import { UserSlice } from '../services/store/state/UserSlice';
import { useAuth } from '../hooks/useAuth';
import ErrorModal from '../pages/ErrorModal';
import { createDate } from '../utils/helpers';
import Socket from '../services/api/socket';

function MessageInput() {
  const {isError} = useSelector(state => state.userReducer);
  const {addMessage} = MessageSlice.actions;
  const {toggleError} = UserSlice.actions;
  const dispatch = useDispatch();
  const [input, changeInput] = useState('Yo');
  const {isAuth, name, code} = useAuth();
  
  const addMessages = (e) => {
    e.preventDefault();
    if (isAuth) {
      if (input === '') return;
      // let id = Math.floor(Math.random() * 100000);
      // let date =  createDate();
      // dispatch(addMessage({text:input, name, id, date}));
      Socket.send(input);
    } else {
      dispatch(toggleError());
    }
    changeInput('');
  };


  const changeMessage = (e) => {
    changeInput(e.target.value); 
  };

  return(
    <>
    {isError && <ErrorModal message={'Login to send messages'}/>}
    <footer className="footer">
      <div className="footer__body">
        <form action="submit" className="footer__form" onSubmit={addMessages}>
          <div className="input-container">
            <input
              type="text"
              name="message"
              placeholder="Сообщение"
              className="input"
              value={input}
              onChange={changeMessage}
            />
            <button type="submit" className="input-button">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Breeze-document-send-16.svg/1200px-Breeze-document-send-16.svg.png"
                className="img"
                alt=""
              />
            </button>
          </div>
        </form>
      </div>
    </footer>
    </>
  );
}

export default MessageInput;