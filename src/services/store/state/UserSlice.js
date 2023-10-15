import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
  code: null,
  email: null,
  isAuth: false,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setName(state, action) {
    //   state.name = action.payload;
    // },
    // setCode(state, action) {
    //   state.code = action.payload;
    // },
    // setEmail(state, action) {
    //   state.email = action.payload;
    // },
    setLogin(state, action) {
      state.name = action.payload.name;
      state.code = action.payload.code;
      state.email = action.payload.email;
    },
  }
});

export default UserSlice.reducer;
