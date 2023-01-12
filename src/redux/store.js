import { configureStore } from '@reduxjs/toolkit';
import  authValues from './slicers/auth'
export default configureStore({
  reducer: {
    auth:authValues
  },
});