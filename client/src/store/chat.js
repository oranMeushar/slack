import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../utils/api';
// import {toast} from 'react-toastify';

export const sendNewMessage = createAsyncThunk(
  'chat/sendNewMessage',
  async (body, thunkAPI) => {
    const endPoint = 'chat/new-message'
    const user = JSON.parse(localStorage.getItem('user'));
    await api.post(endPoint, body, user.token)
  }
)

export const getChatHistory = createAsyncThunk(
  'chat/getChatHistory',
  async (body, thunkAPI) => {
    const endPoint = 'chat/history'
    const user = JSON.parse(localStorage.getItem('user'));
    const [result, data] = await api.post(endPoint, body, user.token);
    return data;
  }
)

const initialState = {
  messages: [],
  chatDetails: {},
  chatType: null,

}

const chatSlice = createSlice({
  name: 'chat', 
  initialState,
  reducers: {
    setChosenChat: (state, action) => {
      state.chatDetails = action.payload.chatDetails;
      state.chatType = action.payload.chatType;
    },
    updateChatMessages:(state, action) => {
      state.messages.push(action.payload);
    },
    setLogoutChat:(state, action) => {
      for (const key in initialState) {
        state[key] = initialState[key];
      }
    }
  },
  extraReducers:{
    [sendNewMessage.fulfilled]: (state, action) => {},
    [getChatHistory.fulfilled]: (state, action) => {
      state.messages = action.payload.data
    },
  }

  
  
})


export const { 
    setChosenChat,
    updateChatMessages,
    setLogoutChat
} = chatSlice.actions

export default chatSlice.reducer