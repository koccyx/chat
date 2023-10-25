import React, { useEffect, useReducer } from 'react';
import { useToggle } from '../hooks/useToggle';
import { UserSlice } from '../services/store/state/UserSlice';
import { useDispatch } from 'react-redux';

export default function ErrorModal(props) {
  const [modal, setToggle] = useToggle(true);
  const {toggleError} = UserSlice.actions;
  const dispatch = useDispatch();

  function toggle() {
    dispatch(toggleError());
    setToggle();
  }

  return (
     modal && 
      <>
      <div className="overlay" onClick={toggle}></div>
      <div className="popup popup-small">
        <div className="popup-content">
          <h2 className="popup__title">{props.message}</h2>
          <div className="vertical-popup">
            <button onClick={toggle} className="btn">OK</button>
          </div>
        </div>
      </div>
      </>
  );
}