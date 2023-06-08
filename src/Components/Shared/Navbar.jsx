import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Navbar = () => {

    const {setLoggingAs,user,auth,setUser}=useContext(AuthContext)
    const handleTypeUser=()=>{
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

    const handleLogout=()=>{

        signOut(auth).then(() => {
            // Sign-out successful.
            setUser(null)
          }).catch((error) => {
            // An error happened.
          });
    }
    return (
        <div>
            <div className="navbar bg-base-100 font-nunito">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <Link to='/'><h1 className='mr-5 hover:underline font-bold'>Home</h1></Link>
                     <Link to='/instructors'><h1 className='mr-5 hover:underline font-bold'>Instructors</h1></Link>
                    <Link to='/classes'><h1 className='mr-5 hover:underline font-bold'>Classes</h1></Link>
                    {user&&<Link to='/dashboard'><h1 className='mr-5 hover:underline font-bold'>Dashboard</h1></Link>}
                        </ul>
                    </div>
                    <Link to='/'><img className='w-[80px] h-[80px]' src="https://media.discordapp.net/attachments/1072167540375179264/1115652133887410196/InstrumentLogo.png?width=427&height=427" alt="" /></Link>
                    <h1 className='text-lg font-bold'>Melodic Adventures</h1>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <Link to='/'><h1 className='mr-5 hover:underline font-bold'>Home</h1></Link>
                     <Link to='/instructors'><h1 className='mr-5 hover:underline font-bold'>Instructors</h1></Link>
                    <Link to='/classes'><h1 className='mr-5 hover:underline font-bold'>Classes</h1></Link>
                    {user&&<Link to='/dashboard'><h1 className='mr-5 hover:underline font-bold'>Dashboard</h1></Link>}

                </div>
                <div className="navbar-end">
                    
                    {user?.photoURL?<img className='w-[60px] h-[60px] rounded-[50%] mr-[20px]' src={user.photoURL}></img>:user&&<img className='w-[60px] h-[60px] rounded-[50%] mr-[20px]' src='https://th.bing.com/th/id/OIP.Z5BlhFYs_ga1fZnBWkcKjQHaHz?pid=ImgDet&rs=1'></img> }
                    {user?<a onClick={handleLogout} className="btn btn-warning">logout</a>:<Link to='/login'><a className="btn btn-warning">Login</a></Link>}

                </div>
            </div>
        </div>
    );
};

export default Navbar;