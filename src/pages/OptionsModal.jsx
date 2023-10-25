import React, { useState } from 'react';
import { useToggle } from '../hooks/useToggle.js';
import { useAuth } from '../hooks/useAuth.js';
import { api } from '../services/api/api.js';
import { useDispatch } from 'react-redux';
import { UserSlice } from '../services/store/state/UserSlice.js';

export default function OptionsModal() {
  const [modal, setToggle] = useToggle(false);
  const {name, code} = useAuth();
  const [nameInput, setInput] = useState(name);

  const {setName} = UserSlice.actions;
  const dispatch = useDispatch();

  

  const changeInput = (e) => {
    setInput(e.target.value);
  };


  const [sendName, status] = api.useChangeNameMutation(name, code);

  const changeName = async () => {
    console.log(code);
    let name = nameInput;
    await sendName({name, code});
    if(!status.isError) {
      dispatch(setName(nameInput));
    }
    setToggle();
    console.log(status);
  };
  

  return (
  <>
    <div className="btn" onClick={setToggle}>Настройки</div>
    {modal && 
      <>
        <div className="overlay" onClick={setToggle}></div>
        <div className="popup">
          <div className="close_field">
            <button className='close_btn' onClick={setToggle}>+</button>
          </div>
          <div className="popup-content">
            <h2 className="popup__title">Настройки</h2>
            <div className="vertical-popup">
              <label className="popup__username">Изменить имя:</label
              >
              <input
                type="text"
                value={nameInput}
                className="popup__input"
                placeholder="Введите ваше имя"
                onChange={changeInput}
              />
              <button onClick={changeName} className="btn">Ввести имя</button>
            </div>
          </div>
        </div>
      </>
    }
  </>
  );
}