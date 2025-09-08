import { configureStore } from '@reduxjs/toolkit'
import userInfoSlice  from './slices/userInfoSlice'
import activeSlice  from './slices/activeSlice'

export default configureStore({
  reducer: {
    userinfo:userInfoSlice,
    activechat:activeSlice

  },
})