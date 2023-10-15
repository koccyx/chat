import { configureStore, combineReducers } from '@reduxjs/toolkit';
import messageReducer from './state/MessageSlice.js';
import userReducer from './state/UserSlice.js';
import { api } from '../api/api.js';

const rootReducer = combineReducers({
  messageReducer,
  userReducer,
  [api.reducerPath]: api.reducer,
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({serializableCheck: false}).concat(api.middleware),
});