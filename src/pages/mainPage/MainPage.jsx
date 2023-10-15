import React from 'react';
import './style.css';
import MessageInput from '../../components/MessageInput.jsx';
import Chat from '../../components/Chat';
import EmailModal from '../EmailModal';


function MainPage() {
  return (
    <div className="wrapper">
      <div className="container">
        <header className="header">
          <div className="header__body">
            <div className="button__container">
              <EmailModal />
              <div className="header__settings btn" hidden id="openOptions">Настройки</div>
            </div>
            <div className="header__exit btn" id="exitButton">Выйти</div>
          </div>
        </header>
        <Chat />
        <MessageInput />
      </div>
    </div>
  );
}

export default MainPage;