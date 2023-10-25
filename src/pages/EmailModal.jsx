import React, { useState } from 'react';
import CodeModal from './CodeModal';
import { api } from '../services/api/api';
import { useToggle } from '../hooks/useToggle';

export default function inputEmailModal(props) {
  const [modal, setToggle] = useToggle(false);
  const [inputEmail, setInput] = useState('');

  const [sendinputEmail] = api.usePostMailMutation(inputEmail);

  const changeInput = (e) => {
    setInput(e.target.value);
  };

  const sendMail = async () => {
    setToggle();
    await sendinputEmail(inputEmail);
  };

  return (
  <>
    <div className="header__settings btn" onClick={setToggle}>Авторизация</div>
    {modal && 
      <>
        <div className="overlay" onClick={setToggle}></div>
        <div className="popup">
          <div className="close_field">
            <button className='close_btn' onClick={setToggle}>+</button>
          </div>
          <div className="popup-content">
            <h2 className="popup__title">Авторизация</h2>
            <div className="vertical-popup">
              <label className="popup__username">Введите email:</label
              >
              <input
                type="text"
                value={inputEmail}
                className="popup__input"
                placeholder="Введите ваш e-mail"
                onChange={changeInput}
              />
              <button className="btn" onClick={sendMail}>Получить код</button>
              <div>
                <CodeModal togglePriveousModal={setToggle} setCode={props.setCode} refetch={props.refetch} logIn={props.logIn}/>
              </div>
            </div>
          </div>
        </div>
      </>
    }
  </>
  );
}