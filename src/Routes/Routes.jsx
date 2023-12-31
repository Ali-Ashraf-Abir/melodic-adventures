import React from 'react';
import {
    createBrowserRouter,

  } from "react-router-dom";
import Classes from '../Components/Classes/Classes';
import Dashboard from '../Components/Dashboard/Dashboard';
import Home from '../Components/Home/Home';
import HomeComponents from '../Components/Home/HomeComponents';
import Instructors from '../Components/Instructors/Instructors';
import Login from '../Components/Login/Login';
import PrivateRoute from '../Components/PrivateRoute.jsx/PrivateRoute';
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
          },
          {
              path:'/dashboard',
              element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>
          },
          {
            path:'/classes',
            element:<Classes></Classes>
        },
        {
          path:'/instructors',
          element:<Instructors></Instructors>
      }
      ]
    },
  ]);

  export default router;