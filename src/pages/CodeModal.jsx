import React, { useState } from 'react';
import { useToggle } from '../hooks/useToggle.js';
import { api } from '../services/api/api.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { UserSlice } from '../services/store/state/UserSlice.js';
import { useDispatch } from 'react-redux';


export default function CodeModal(props) {
  const [modal, setToggle] = useToggle(false);
  const [codeInput, setInput] = useState('');
  const dispatch = useDispatch();

  const { setLogin } = UserSlice.actions;

  const [code, setCode] = useLocalStorage(null, 'code');

  const {data, refetch} = api.useGetLoginQuery(code);

  const authMe = async () => {
    setCode(codeInput);
    await refetch(code);
    if (data) {
      dispatch(setLogin({...data, code}));
    }

    console.log(data);
  };

  const changeInput = (e) => {
    setInput(e.target.value);
  };

  // const authMe = () => {
    
  // };

  return (
  <>
    <div className="btn" onClick={setToggle}>Ввести код</div>
    {modal && 
      <>
        <div className="overlay" onClick={setToggle}></div>
        <div className="popup">
          <div className="close_field">
            <button className='close_btn' onClick={props.togglePriveousModal}>+</button>
          </div>
          <div className="popup-content">
            <h2 className="popup__title">Авторизация</h2>
            <div className="vertical-popup">
              <label className="popup__username">Введите токен:</label
              >
              <input
                type="text"
                value={codeInput}
                className="popup__input"
                placeholder="Введите ваш токен"
                onChange={changeInput}
              />
              <button onClick={authMe} className="btn">Ввести код</button>
            </div>
          </div>
        </div>
      </>
    }
  </>
  );
}