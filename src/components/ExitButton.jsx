import React from 'react';
import { useDispatch } from 'react-redux';
import { UserSlice } from '../services/store/state/UserSlice';
import Cookies from 'js-cookie';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from '../hooks/useAuth';
import Socket from '../services/api/socket';

export default function ExitButton() {
  const {setLogin} = UserSlice.actions;
  const dispatch = useDispatch();
  const [_, setCodee] = useLocalStorage(null, 'code');
  const {isAuth} = useAuth();

  const userLeave = () => {
    if (!isAuth) return;
    // debugger;
    Cookies.remove('code');
    setCodee(null);
    dispatch(setLogin({name: null, code: null, email: null}));
    Socket.close();
  };

  return <div onClick={userLeave} className="header__exit btn" id="exitButton">Выйти</div>;
}