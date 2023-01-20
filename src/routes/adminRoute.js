import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';

const AdminRoute = () => {
  
return (
    isAuthenticated() && isAuthenticated().type === "ADMIN" ? <Outlet/> : isAuthenticated() ? <Navigate to='/unauthorized'/> : <Navigate to='/'/>
  )
}

export default AdminRoute;