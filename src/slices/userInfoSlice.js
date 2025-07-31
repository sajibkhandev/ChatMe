import { createSlice } from '@reduxjs/toolkit'

export const userInfoSlice = createSlice({
  name: 'info',
  initialState: {
    value: localStorage.getItem("userinfo") ? JSON.parse(localStorage.getItem("userinfo")) :null,
  },
  reducers: {
    userdetails: (state,action) => {
        state.value=action.payload
       
        
    },
   
  },
})
export const { userdetails} = userInfoSlice.actions

export default userInfoSlice.reducer