import { configureStore } from '@reduxjs/toolkit'
import auth from './store/user';
import friends from './store/friends';
import chat from './store/chat';
import room from './store/room';

export const store = configureStore({
  reducer: {
      auth,
      friends,
      chat,
      room
  },
})