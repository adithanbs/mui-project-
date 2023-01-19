
// import React from 'react'
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
// import { Authenticated, isAuthenticated } from '../auth/helper'

 

// const  UserRoute = ({children}) => {
//     // const {userRole} = useSelector(state => state.auth);
//     if( isAuthenticated().type === "NORMAL") {
//         return <>{children}</>
//     }else{
//         return <Navigate to ={'/'}/>
//     }
    
  
// }


// export default UserRoute

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';

const UserRoute = () => {
  
return (
    isAuthenticated() && isAuthenticated().type === "NORMAL" ? <Outlet/> : <Navigate to='/'/>
  )
}

export default UserRoute;