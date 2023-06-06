import React from 'react';
import {
    createBrowserRouter,

  } from "react-router-dom";
import Home from '../Components/Home/Home';
import HomeComponents from '../Components/Home/HomeComponents';
import Login from '../Components/Login/Login';


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
          }
      ]
    },
  ]);

  export default router;