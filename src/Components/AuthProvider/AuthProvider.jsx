import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import app from '../Firebase/Firebase.init';


export const AuthContext=createContext(null)

const provider = new GoogleAuthProvider();
const auth = getAuth(app);



const AuthProvider = ({children}) => {
  
  const [loading,setLoading]=useState(true)
    useEffect(()=>{


        const unsubscribe= onAuthStateChanged(auth, (user) => {
             if (user) {
               // User is signed in, see docs for a list of available properties
               // https://firebase.google.com/docs/reference/js/auth.user
               const uid = user.uid;
               setUser(user)
               setLoading(false)
             } else {
               // User is signed out
               // ...
             }
           });
         
           return ()=>{
               unsubscribe()} 
     
     },[])

    const [user,setUser]=useState('')
    const [loggingAs,setLoggingAs]=useState()
    const [loggingError,setLoggingError]=useState()
    

    const signinGoogle=()=>{
        signInWithPopup(auth, provider)
      .then((result) => {
    
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        setUser(user)
        console.log(user)
        fetch ('http://localhost:5000/users',{
          method:'POST',
          headers:{
              'content-type': 'application/json'
          },
          body:JSON.stringify(user)
      })
      .then(res=>res.json())
      .then (data=>{
          console.log(data)
      })
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
    
        // ...
      });
    }
    const authInfo={

        user,
        auth,
        setUser,
        setLoggingAs,
        loggingAs,
        loggingError,
        setLoggingError,
        provider,
        signinGoogle,
        loading,
        setLoading


    }
    return (


            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
            

    );
};

export default AuthProvider;