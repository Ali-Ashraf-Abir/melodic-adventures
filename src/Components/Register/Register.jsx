import React, { useContext, useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from '../AuthProvider/AuthProvider';
import { getAuth, updateProfile } from "firebase/auth";




const Register = () => {
    window.scroll(0,0)
    const { auth,setUser,loggingAs,signinGoogle,setLoading } = useContext(AuthContext)
    const [passwordError,setPasswordError]=useState('')
    const [registerError,setRegisterError]=useState(null)
    const [registerSuccess,setRegisterSuccess]=useState(null)
    const handleSignin = (event) => {

        event.preventDefault()

        const form = event.target
        const email1 = form.email.value
        const email=email1.toLowerCase()
        const password = form.password.value
        const imageUrl = form.url.value
        const address = form.address.value
        const gender = form.gender.value
        const name = form.name.value
        const role='student'

        const userData = { email, password, imageUrl, address, gender,name,role }
        console.log(userData)
        if(!passwordError){
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
             
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: imageUrl
                  }).then(() => {
                    // Profile updated!
                    // ...
                  }).catch((error) => {
                    // An error occurred
                    // ...
                  });
                  console.log(user)
                 setUser(user)

                 form.reset()
                 setRegisterSuccess("succesfully registered")
                 fetch ('https://melodic-adventure-server.vercel.app/users',{
                     method:'POST',
                     headers:{
                         'content-type': 'application/json'
                     },
                     body:JSON.stringify(userData)
                 })
                 .then(res=>res.json())
                 .then (data=>{
                     console.log(data)
                 })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                setRegisterError(errorMessage)
                // ..
            });}

    }

  
    const handlePassword=(event)=>{

        const password=event.target.value;

        if(/^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=.,]).*$/.test(password)==false){

            setPasswordError('the password must contain atleast one capital letter and on special character')
        }
        else{
            setPasswordError(null)
        }




    }




    return (
        <div>
            <div className='text-3xl font-bold text-center'>Register Now!</div>
            <form onSubmit={handleSignin} className=' mt-[20px] lg:w-[40%] mx-auto bg-gray-300 py-12 rounded-lg flex flex-col justify-center items-center font-nunito font-bold'>

                <div className="">
                    {
                        registerSuccess?registerSuccess:''
                    }
                </div>

            <div className="">
                    <h1>Name:</h1>
                    <input required name='name' type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" />

                </div>
                <div className="">
                    <h1>Email:</h1>
                    <input required name='email' type="text" placeholder="Email" className="input input-bordered w-full max-w-xs" />

                </div>

                <div className="">
                    <h1>Password:</h1>
                    <input onChange={handlePassword} required name='password' type="password" placeholder="password" className="input input-bordered w-full max-w-xs" />

                </div>

                <div className="">
                    <h1>Image Url:</h1>
                    <input name='url' type="text" placeholder="image-url" className="input input-bordered w-full max-w-xs" />

                </div>
                <div className="">
                    <h1>Address:</h1>
                    <input name='address' type="text" placeholder="Address" className="input input-bordered w-full max-w-xs" />

                </div>
                <div className="flex justify-start mt-2">
                    <h1>gender:</h1>
                    <select name='gender'>


                        <option value="Male" selected>Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="mt-2">
                    <input type="submit" placeholder='Submit' className='btn bg-warning' />
                </div>
                <div className="">
                    {
                        passwordError&&<h1>{passwordError}</h1>
                    }
                                        {
                        registerError&&<h1>{registerError}</h1>
                    }
                </div>
            </form>
            <div className="text-center mt-[20px] font-nunito">
                <h1 className='my-2'>or,</h1>
                <button onClick={signinGoogle} className='btn btn-neutral'>Sign in With Google</button>
            </div>
        </div>

    );
};

export default Register;