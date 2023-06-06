import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import app from '../Firebase/Firebase.init';


export const AuthContext=createContext(null)


const auth = getAuth(app);



const AuthProvider = ({children}) => {


    useEffect(()=>{


        const unsubscribe= onAuthStateChanged(auth, (user) => {
             if (user) {
               // User is signed in, see docs for a list of available properties
               // https://firebase.google.com/docs/reference/js/auth.user
               const uid = user.uid;
               // ...
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
    const authInfo={

        user,
        auth,
        setUser,
        setLoggingAs,
        loggingAs,
        loggingError,
        setLoggingError


    }
    return (


            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
            

    );
};

export default AuthProvider;