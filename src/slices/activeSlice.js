import { createSlice } from '@reduxjs/toolkit'

export const activeSlice = createSlice({
  name: 'active',
  initialState: {
    value:"Anik",
  },
  reducers: {
    activeChat: (state,action) => {
      
      state.value=action.payload
      
       
        
    },
   
  },
})
export const { activeChat} = activeSlice.actions

export default activeSlice.reducer