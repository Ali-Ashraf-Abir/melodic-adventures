import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import app from '../Firebase/Firebase.init';


export const AuthContext=createContext(null)

const provider = new GoogleAuthProvider();
const auth = getAuth(app);



const AuthProvider = ({children}) => {


    useEffect(()=>{


        const unsubscribe= onAuthStateChanged(auth, (user) => {
             if (user) {
               // User is signed in, see docs for a list of available properties
               // https://firebase.google.com/docs/reference/js/auth.user
               const uid = user.uid;
               setUser(user)
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
        signinGoogle


    }
    return (


            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
            

    );
};

export default AuthProvider;