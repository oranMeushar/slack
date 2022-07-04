//TODO:change what needed
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
  user:{
    name: null,
    email:null,
    token:null
  }
}

const userSlice = createSlice({
  name: 'users', 
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
    },
    setLogoutAuth: (state, action) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },

    // Add reducers for additional action types here, and handle loading state as needed
  extraReducers: {

  },
  
})


export const { 
  setLogin,
  setLogoutAuth
} = userSlice.actions

export default userSlice.reducer