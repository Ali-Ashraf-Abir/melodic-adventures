import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Login = () => {

    const navigate=useNavigate()
    const { setLoggingAs, user, auth, loggingError, setLoggingError,setUser,signinGoogle } = useContext(AuthContext)
    const handleTypeUser = () => {
        swal("How You Want To Use This Account?", {
            buttons: {
                instructor: "Am an Instructor",

                student: 'Am a Student',
            },
        })
            .then((value) => {
                switch (value) {

                    case "instructor":
                        setLoggingAs('instructor')
                        break;

                    case "student":
                        setLoggingAs('student')
                        break;


                }
            });
    }

    const handleLogin = (event) => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value
        const password = form.password.value

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                setUser(user)
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoggingError(true)

            });
    }


    return (
        <div>
            <div>
                <div className='text-3xl font-bold text-center'>Login Now!</div>
                <form onSubmit={handleLogin} className=' mt-[20px] lg:w-[40%] mx-auto bg-gray-300 py-12 rounded-lg flex flex-col justify-center items-center font-nunito font-bold'>


                    <div className="">
                        <h1>Email:</h1>
                        <input required name='email' type="text" placeholder="Email" className="input input-bordered w-full max-w-xs" />

                    </div>

                    <div className="">
                        <h1>Password:</h1>
                        <input required name='password' type="password" placeholder="password" className="input input-bordered w-full max-w-xs" />

                    </div>

                    <div className="mt-2">
                        <input type="submit" placeholder='Submit' className='btn bg-warning' />
                    </div>
                    <div className="">
                        <h1>dun have an account? <span className='text-blue-500'><Link to='/register'>register</Link></span> here</h1>
                    </div>
                    {
                        loggingError ? <div className="">
                            <h1 className='text-red-800'>Error!!Wrong email or password</h1>
                        </div>:''
                    }
                </form>
                <div className="text-center mt-[20px] font-nunito">
                    <h1 className='my-2'>or,</h1>
                    <button onClick={signinGoogle} className='btn btn-neutral'>Sign in With Google</button>
                </div>

            </div>

        </div>
    );
};

export default Login;