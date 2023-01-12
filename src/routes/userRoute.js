
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


 

const  UserRoute = ({children}) => {
    const {userRole} = useSelector(state => state.auth);
    if("user" === userRole) {
        return <>{children}</>
    }else{
        return <Navigate to ={'/'}/>
    }
    
  
}


export default UserRoute