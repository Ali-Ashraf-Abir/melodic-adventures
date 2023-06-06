import React from 'react';
import {
    createBrowserRouter,

  } from "react-router-dom";
import Home from '../Components/Home/Home';
import HomeComponents from '../Components/Home/HomeComponents';
import Login from '../Components/Login/Login';
import Register from '../Components/Register/Register';


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
      children:[
          {
            path:'/',
            element:<HomeComponents></HomeComponents>
          },
          {
              path:'/login',
              element:<Login></Login>
          },
          {
              path:'/register',
              element:<Register></Register>
          }
      ]
    },
  ]);

  export default router;