import { useSelector } from 'react-redux';
import { api } from '../services/api/api';

export function useAuth(initialToken) {
  const {email, code, name} = useSelector(state => state.userReducer);

  return {
    isAuth: !!name,
    email,
    code,
    name,
  };
}