import { getAuth } from 'firebase/auth';
import React, { createContext } from 'react';
import app from '../Firebase/Firebase.init';


export const AuthContext=createContext(null)


const auth = getAuth(app);

const user='pokemon'
const AuthProvider = ({children}) => {

    const authInfo={

        user,
        auth


    }
    return (


            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
            

    );
};

export default AuthProvider;