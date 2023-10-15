import { createSlice } from '@reduxjs/toolkit';
import createMessage from '../../../utils/messageConstructor';
import { createDate } from '../../../utils/helpers';

const initialState = {
  messages: [],
  currentMessage: 'Yo',
};

export const MessageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    changeCurrentMessage(state, action) {
      state.currentMessage = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(new createMessage(state.currentMessage , createDate(), 'Me', action.payload));
      state.currentMessage = '';
    }
  }
});

export default MessageSlice.reducer;