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
      {/* <RouterProvider router={router} /> */}
      {/* <Register /> */}
      <Routes>
        <Route exact path='/'  element = {<Register />}/>
        <Route path='/user-login'  element = {<LogIn />}/>

        
        <Route path='/home'  element = {
        <UserRoute>
          <Home />
          {/* <ViewProducts path='view-products'/> */}
        </UserRoute>
        }/>
      
      {/* <Route path='/home'  element = {
        <AdminRoute>
          <Home />
          <AddProducts/>
          <ViewProducts/>
         </AdminRoute>
        }/> */}
      
      </Routes>

      </Provider> 
    </div>
  );
}

export default App;
