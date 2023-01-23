import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { SignUp } from '../../../auth/helper'

// Initial value
const initialState = {
    userList: [],
    isLoading: false,
    error:"",
    registerUserToken :""
  } 

// GET
// First, create the thunk
export const fetchUserList = createAsyncThunk(
  'users/fetchUserList',
  async (_,{ rejectWithValue }) => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
    return response.data
  }
)

// Post APi
export const userRegister = createAsyncThunk(
  'users/userRegister',
  async (data,{ rejectWithValue }) => {
    const responce = await SignUp(data)
    // .then (responce => responce)
    // .catch ((err) => console.log(err))
   console.log("users/userRegister");
    return responce.data
    
    // const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
   
  }
)


// Then, handle actions in your reducers:
  const userListSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
 
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
  
// GET USER-LIST

    builder.addCase(fetchUserList.pending, (state, action) => {
      // Add user to the state array
      state.userList = []
      state.isLoading = true
      state.error = ""
    }) 

    builder.addCase(fetchUserList.fulfilled, (state, action) => {
      // Add user to the state array
      state.userList.push (action.payload)
      state.isLoading = false
      state.error = ""
    })

    builder.addCase(fetchUserList.rejected, (state, action) => {
      // Add user to the state array
      state.userList = []
      state.isLoading = false
      state.error = "Api is not fetch"
    })

  //POST ADD USER REGISTRACTION
  builder.addCase(userRegister.pending, (state, action) => {
    // Add user to the state array
    state.registerUserToken = ""
    state.isLoading = true
    state.error = ""
  }) 

  builder.addCase(userRegister.fulfilled, (state, action) => {
    // Add user to the state array
    state.registerUserToken =  action.payload.data.accessToken
    state.isLoading = false
    state.error = ""
    console.log(" action.payload",  action.payload.data.accessToken);
  })

  builder.addCase(userRegister.rejected, (state, action) => {
    // Add user to the state array
    state.registerUserToken = ""
    state.isLoading = false
    state.error = "Api is not fetch"
  })

  },
},
})



// Later, dispatch the thunk as needed in the app
// dispatch(fetchUserList())

// // this is for dispatch
//  export const {  extraReducers } = userListSlice.actions;

// this is for configureStore
export default userListSlice.reducer;