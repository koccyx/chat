import React from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import { MessageSlice } from '../services/store/state/MessageSlice';

function MessageInput() {
  const {currentMessage} = useSelector(state => state.messageReducer);
  const {changeCurrentMessage, addMessage} = MessageSlice.actions;
  const dispatch = useDispatch();
  
  const addMessages = (e) => {
    e.preventDefault();
    dispatch(addMessage(Math.floor(Math.random() * 100000)));
  };

  return(
    <footer className="footer">
      <div className="footer__body">
        <form action="submit" className="footer__form" onSubmit={addMessages}>
          <div className="input-container">
            <input
              type="text"
              name="message"
              placeholder="Сообщение"
              className="input"
              value={currentMessage}
              onChange={(e) => dispatch(changeCurrentMessage(e.target.value))}
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
  );
}

export default MessageInput;