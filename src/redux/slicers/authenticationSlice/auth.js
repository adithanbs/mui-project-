import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    value :0,
    userDetails:localStorage.getItem("jwt"),
    emailConformToken:[],
    isLoading: false,
    error:false
   
}

const BaseUrl = process.env.REACT_APP_BaseURL
// Post forgot password request APi
export const userforgotPasswordRequest = createAsyncThunk(
    'users/userforgotPasswordRequest',
    async (data,rejectWithValue) => {
      const responce = await axios.post(`${BaseUrl}forgetpassword`,data)  
      // console.log("res",responce.data.data);
      return responce.data 

    }
  )
// confirm the New password request
  export const userforgotPasswordConfirm = createAsyncThunk(
    'users/userforgotPasswordRequest',
    async (data,{ rejectWithValue }) => {
      const responce = axios.post(`${BaseUrl}updatepassword`,data)  
      return responce.data 
    }
  )  
   
const authSlice = createSlice({
name:"auth",
initialState,
reducers: {
    setAuthValue(state,action){
      console.log(action.payload)
        state.value = action.payload
    },
    setUser(state,action){
      console.log(action.payload)
        state.userRole = action.payload
    },
    // Use Thunk
  
},

extraReducers: (builder) => {
  console.log("builder",builder.addCase);
  
// post Forgot password

    builder.addCase(userforgotPasswordRequest.pending, (state, action) => {
      // Add user to the state array
      state.emailConformToken = []
      state.isLoading = true
      state.error = false
    }) 

    // builder.addCase(userforgotPasswordRequest.fulfilled, (state, action) => {
    //   console.log("payload",action.payload);
    //   // Add user to the state array
    //   state.emailConformToken.push(action.payload.data)
    //   state.isLoading = false
    //   state.error = false
     
      
    // })

    builder.addCase(userforgotPasswordRequest.fulfilled, (state, action) => {
      // Add user to the state array
      console.log(action,"payload")
      state.emailConformToken = action.payload
      state.isLoading = false
      state.error = true
    })

    builder.addCase(userforgotPasswordRequest.rejected, (state, action) => {
      // Add user to the state array
      state.emailConformToken = []
      state.isLoading = false
      state.error = true
    })

// confirm the password          

    //  builder.addCase(userforgotPasswordConfirm.pending, (state, action) => {
    //    // Add user to the state array
    //    state.userDetails = []
    //    state.isLoading = true
    //    state.error = false
    //  }) 

    //  builder.addCase(userforgotPasswordConfirm.fulfilled, (state, action) => {
    //    // Add user to the state array
    //    state.userDetails.push(action.payload)
    //    state.isLoading = false
    //    state.error = false
    //  })

    //  builder.addCase(userforgotPasswordConfirm.rejected, (state, action) => {
    //    // Add user to the state array
    //    state.userDetails = []
    //    state.isLoading = false
    //    state.error = true
    //  })
}

});

// this is for dispatch
export const { setAuthValue,setUser } = authSlice.actions;

// this is for configureStore
export default authSlice.reducer;