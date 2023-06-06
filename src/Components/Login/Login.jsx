import React, { useContext } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from '../AuthProvider/AuthProvider';





const Login = () => {

    const { auth } = useContext(AuthContext)

    const handleSignin = (event) => {

        event.preventDefault()

        const form = event.target
        const email = form.email.value
        const password = form.password.value
        const imageUrl = form.url.value
        const address = form.address.value
        const gender = form.gender.value

        const userData = { email, password, imageUrl, address, gender }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    }





    return (
        <div>
            <div className='text-3xl font-bold text-center'>Login Now!</div>
            <form onSubmit={handleSignin} className=' mt-[20px] lg:w-[40%] mx-auto bg-gray-300 py-12 rounded-lg flex flex-col justify-center items-center font-nunito font-bold'>

                <div className="">
                    <h1>Email:</h1>
                    <input name='email' type="text" placeholder="Email" className="input input-bordered w-full max-w-xs" />

                </div>
                <div className="">
                    <h1>Password:</h1>
                    <input name='password' type="password" placeholder="password" className="input input-bordered w-full max-w-xs" />

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
            </form>
            <div className="text-center mt-[20px] font-nunito">
                <h1 className='my-2'>or,</h1>
                <button className='btn btn-neutral'>Sign in With Google</button>
            </div>
        </div>

    );
};

export default Login;