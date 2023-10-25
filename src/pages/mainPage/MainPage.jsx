import React, { useEffect } from 'react';
import './style.css';
import MessageInput from '../../components/MessageInput.jsx';
import Chat from '../../components/Chat';
import EmailModal from '../EmailModal';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { api } from '../../services/api/api';
import { useDispatch } from 'react-redux';
import { UserSlice } from '../../services/store/state/UserSlice';
import Preloader from '../../utils/Preloader';
import { useAuth } from '../../hooks/useAuth';
import OptionsModal from '../OptionsModal';
import ExitButton from '../../components/ExitButton';



function MainPage() {
  const [code, setCode] = useLocalStorage(null, 'code');
  const {data, refetch, isLoading} = api.useGetLoginQuery(code);

  const dispatch = useDispatch();
  const {setLogin} = UserSlice.actions;

  const {isAuth} = useAuth();

  const logIn = () => {
    if(data) {
      dispatch(setLogin({...data, code}));
    }
  };


  useEffect(() => {
    logIn();
  },[data]);

  return ( 
    <div className="wrapper">
      {isLoading ? <Preloader /> : (
      <div className="container">
        <header className="header">
          <div className="header__body">
            <div className="button__container">
              {isAuth ? <OptionsModal /> : <EmailModal setCode={setCode} refetch={refetch} logIn={logIn.bind(this)}/>}
              <div className="header__settings btn" hidden id="openOptions">Настройки</div>
            </div>
            <ExitButton />
          </div>
        </header>
        <Chat />
        <MessageInput />
      </div>)}
    </div>
  );
}

export default MainPage;