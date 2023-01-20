import React from 'react';
import Register from './pages/register'
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';
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

function App() {
  return (
    <div className="App">
      <Provider store={store}>
     

      <Routes>

{/* PUPLIC ROUTE   */}
        <Route exact path='/sign-up'  element = {<Register />}/>
        <Route path='/'  element = {<LogIn />}/>
        <Route path='/unauthorized'  element = {<UnAuthorized />}/>
        <Route path='/home'  element={<Home />} />
     
    
{/* USER_ROUTE */} 

        <Route  element = {<UserRoute/>}> 

           <Route path='/user-dashboard'  element={<UserDashboard />} />
           <Route path='/view-all-products'  element={<ViewProducts />} />

        </Route>
        



 {/* ADMIN ROUTES */}
 
        <Route   element = {<AdminRoute/>}>        
           
           <Route path='/admin-dashboard'  element={<AdminDashboard />} />
           <Route path='/add-products'  element={<AddProducts />} />
  
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
