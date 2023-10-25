import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
  code: null,
  email: null,
  isAuth: false,
  isError: false,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin(state, action) {
      state.name = action.payload.name;
      state.code = action.payload.code;
      state.email = action.payload.email;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    toggleError(state) {
      state.isError = !state.isError;
    },
  }
});

export default UserSlice.reducer;
