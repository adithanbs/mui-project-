import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';

const UserRoute = () => {
  
return (
    isAuthenticated() && isAuthenticated().type === "NORMAL" ? <Outlet/> : <Navigate to='/'/>
  )
}

export default UserRoute;