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
    activeRooms:[],
    remoteStreams:[],
    audioOnly:false,
    isUserInRoom:false,
    isUserRoomCreator:false,
    isScreenSharingActive:false,
    localStream:null,
    roomDetails:null,
    screenSharingStream:null,

}

const roomSlice = createSlice({
  name: 'room', 
  initialState,
  reducers: {
    setRoomCreation:(state, action) => {
      state.isUserInRoom = action.payload.isUserInRoom;
      state.isUserRoomCreator = action.payload.isUserRoomCreator;
    },
    setRoomDetails:(state, action) => {
      state.roomDetails = action.payload;
    },
    setActiveRooms:(state, action) => {
      state.activeRooms = action.payload;
    },
    setLocalStream: (state, action) => {
      state.localStream = action.payload;
    },
    setRemoteStreams:(state, action) => {
      state.remoteStreams = action.payload;
    },
    setScreenSharingStream:(state, action) => {
      const stream = action.payload;
      state.isScreenSharingActive = stream ? true : false;
      state.screenSharingStream = stream || null;
    },
    setLogoutRoom:(state, action) => {
      for (const key in initialState) {
        state[key] = initialState[key];
      }
    }
  },

  extraReducers: {
  },
  
})


export const { 
  setRoomCreation,
  setRoomDetails,
  setActiveRooms,
  setLocalStream,
  setRemoteStreams,
  setScreenSharingStream,
  setLogoutRoom
} = roomSlice.actions

export default roomSlice.reducer