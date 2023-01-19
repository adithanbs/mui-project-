import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value :0,
    userDetails:localStorage.getItem("jwt")
}
   
const authSlice = createSlice({
name:"auth",
initialState,
reducers: {
    setAuthValue(state,action){
        state.value = action.payload
    },
    setUser(state,action){
        state.userRole = action.payload
    }
}
});

// this is for dispatch
export const { setAuthValue,setUser } = authSlice.actions;

// this is for configureStore
export default authSlice.reducer;