// import React from 'react'
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
// import { isAuthenticated } from '../auth/helper';


 

// const  AdminRoute = ({children}) => {
//     //  const {userDetails} = useSelector(state => state.auth);
//     // console.log("userDetails-=--",userDetails);
//     if(isAuthenticated().type === "ADMIN") {
//         return <>{children}</>
//     }else{
//         return <Navigate to ={'/'}/>
//     }
    
  
// }


// export default AdminRoute;
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';

const AdminRoute = () => {
  
return (
    isAuthenticated() && isAuthenticated().type === "ADMIN" ? <Outlet/> : isAuthenticated().type !== "ADMIN" ? <Navigate to='/unauthorized'/> : <Navigate to='/'/>
  )
}

export default AdminRoute;