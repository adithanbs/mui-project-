import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


 

const  AdminRoute = ({children}) => {
    const {userRole} = useSelector(state => state.auth);
    if("admin" === userRole) {
        return <>{children}</>
    }else{
        return <Navigate to ={'/'}/>
    }
    
  
}


export default AdminRoute;