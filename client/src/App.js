import React from 'react';
import {Routes, Route} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import PrivateRoute from './hocs/privateRoute/privateRoute';
import { ToastContainer} from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setLogin } from './store/user';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import _ from 'lodash';
import Register from './pages/register/register';
import Home from './pages/home/home'



const App =  () => {
  const dispatch = useDispatch();

  const isAuth = () =>{
      let user = localStorage.getItem('user');
      let decoded = null;
  
      if(user){
        user = JSON.parse(user);
        const {token, email, name, _id} = user;
        try{
          decoded = jwt_decode(token);
        }
        catch (e){
          console.log(e);
        }
  
        if (decoded && decoded.exp > (Date.now() / 1000) ) {
          dispatch(setLogin({email, name, token, _id})); 
        }
      }
    }
    
  isAuth();

  return (
    <>
    <ToastContainer/>
    <Routes>
        <Route exact path='/' element={<PrivateRoute> <Home /> </PrivateRoute>} />
        <Route exact path='/register' element={<Register />} />
    </Routes>
    </>
  );
};

export default App;
