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
    addMessage(state, action) {
      state.messages.unshift(new createMessage(action.payload.text , action.payload.name, action.payload.date, action.payload.id));
    }
  }
});

export default MessageSlice.reducer;