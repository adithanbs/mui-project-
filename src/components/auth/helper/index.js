import axios from 'axios'
import React from 'react'

export const SignIn = (data) => {
  return  axios.post("https://dummyjson.com/auth/login",data)
.then((responce) =>  (responce))
.catch(err => err)  
}
