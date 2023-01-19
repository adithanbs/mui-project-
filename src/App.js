// require('dotenv').config()
// const Dotenv = require('dotenv-webpack');
import React from 'react';
import Register from './pages/register'
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home/home';
import ViewProducts from './pages/viewProducts/viewProducts';
import AddProducts from './pages/addProducts/addProducts';
import { Routes, Route } from "react-router-dom";
import UserRoute from './routes/userRoute';
import AdminRoute from './routes/adminRoute';
import LogIn from './pages/logIn/LogIn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './pages/adminDashboard';
import UserDashboard from './pages/userDashboard';
import Error from './components/error-404';
import UnAuthorized from './components/unauthorizedRoute';


// import { ToastContainer, toast } from 'material-react-toastify';
// import 'material-react-toastify/dist/ReactToastify.css';
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home/>,
    
//   },
//   {
//     path: "/view-products",
//     element: <ViewProducts/>,
    
//   },
//   {
//     path: "/add-products",
//     element: <AddProducts/>,
    
//   },
//   {
//     path: "*",
//     element: <p> page not found</p>,
    
//   },
// ]);


function App() {
  return (
    <div className="App">
      <Provider store={store}>
     

      <Routes>

{/* PUPLIC ROUTE   */}
        <Route exact path='/sign-up'  element = {<Register />}/>
        <Route path='/'  element = {<LogIn />}/>
        <Route path='/unauthorized'  element = {<UnAuthorized />}/>
     
    
{/* USER_ROUTE */} 

        <Route  element = {<UserRoute/>}> 

           <Route path='/user-dashboard'  element={<UserDashboard />} />

        </Route>
        



 {/* ADMIN ROUTES */}
 
        <Route   element = {<AdminRoute/>}>        
           
           <Route path='/admin-dashboard'  element={<AdminDashboard />} />

        </Route>

  {/* CATCH ROUTED       */}
      <Route path='*'  element = {<Error/>}/>
        
      </Routes>

        
        <ToastContainer/>
      </Provider> 
    </div>
  );
}

export default App;
