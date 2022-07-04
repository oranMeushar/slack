import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../utils/api';
// import {toast} from 'react-toastify';

export const handleAcceptInvitation = createAsyncThunk(
  'friends/handleAcceptInvitation',
  async (body, thunkAPI) => {
    const endPoint = 'friends/accept-invitation'
    const user = JSON.parse(localStorage.getItem('user'));
    await api.post(endPoint, body, user.token)
  }
)

export const handleRejectInvitation = createAsyncThunk(
  'friends/handleRejectInvitation',
  async (body, thunkAPI) => {
    const endPoint = 'friends/reject-invitation'
    const user = JSON.parse(localStorage.getItem('user'));
    await api.post(endPoint, body, user.token);
  }
)

const initialState = {
  friendsList: [],
  onlineUsers:[],
  pendingFriends: [],
  loading: false

}

const friendsSlice = createSlice({
  name: 'friends', 
  initialState,
  reducers: {
    setFriendsList: (state, action) => {
      state.friendsList = action.payload;
    },
    setPendingFriends: (state, action) => {
      state.pendingFriends = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setLogoutFriends:(state, action) => {
      for (const key in initialState) {
        state[key] = initialState[key];
      }
    }
  },

  extraReducers: {
    [handleAcceptInvitation.pending]: (state, action) => {
      state.status = true
    },

    [handleAcceptInvitation.fulfilled]: (state, action) => {
      state.status = false
    },

    [handleAcceptInvitation.rejected ]: (state, action) => {
      state.status = false
    },

    [handleRejectInvitation.pending]: (state, action) => {
      state.status = true
    },

    [handleRejectInvitation.fulfilled]: (state, action) => {
      state.status = false
    },

    [handleRejectInvitation.rejected ]: (state, action) => {
      state.status = false
    },
  },
  
})


export const { 
    setFriendsList,
    setPendingFriends,
    setOnlineUsers,
    setLogoutFriends
} = friendsSlice.actions

export default friendsSlice.reducer