import { api } from '../services/api/api';
import { useAuth } from '../hooks/useAuth';
import { useSelector, useDispatch } from 'react-redux';
import { MessageSlice } from '../services/store/state/MessageSlice';
import { format } from 'date-fns'; 
import { useEffect } from 'react';
import { logDOM } from '@testing-library/react';

export function useLoad() {
  const {code} = useAuth();
  const {data, refetch, isSuccess, isError} = api.useGetHistoryQuery(code);
  const {addMessage} = MessageSlice.actions;
  const dispatch = useDispatch();

  const loadMessages = async () => {
    if(!isSuccess) await refetch(code);
    if (data?.messages) {
      let mes = [...data.messages].reverse();
    
      mes.forEach((elem, idx) => {
        let {text, '_id': id, user, 'createdAt': date } = elem;
        let name = user.name;
        date = format(new Date(date), 'HH:mm');
        dispatch(addMessage({text, name, id, date}));
      });
    }
  };

  useEffect(() => {
    if (code) loadMessages(code);
  }, [isSuccess, code]);

  return loadMessages;
}