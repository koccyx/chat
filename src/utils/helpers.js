import { format } from 'date-fns';
import axios from 'axios';

export const createDate = () => {
  const currentTime = Date.now();
  const formattedTime = format(currentTime, 'HH:mm');
  return formattedTime;
};

export const instance = axios.create({
  baseURL: 'https://edu.strada.one/api/',
  headers: {
    // 'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json;charset=utf-8',
    'mode': 'no-cors',
  },
});