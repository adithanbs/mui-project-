import axios from 'axios'
import React from 'react'

export const SignIn = (data) => {
  return  axios.post("https://dummyjson.com/auth/login",{
    username:data.name,
    password:data.password
})
.then((responce) =>  (responce))
.catch(err => err)  
}
