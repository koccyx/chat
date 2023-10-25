import { useSelector } from 'react-redux';

export function useAuth() {
  const {email, code, name} = useSelector(state => state.userReducer);
  
  return {
    isAuth: !!name,
    email,
    code,
    name,
  };
}