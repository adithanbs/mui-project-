import { configureStore } from '@reduxjs/toolkit';
import  authValues from './slicers/authenticationSlice/auth'
import  userListSlice   from './slicers/userListSlice/index'
export default configureStore({
  reducer: {
    auth:authValues,
    userList:userListSlice
  },
});