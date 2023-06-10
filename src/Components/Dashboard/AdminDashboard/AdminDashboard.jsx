import React, { useEffect, useState } from 'react';
import { faCoffee, faUser, faUserAlt, faSchoolCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminTableRow from './AdminTableRow';
import ManageClass from './ManageClass';
const AdminDashboard = () => {
    const [dashboard, setDashboard] = useState('classes')
    const [allUsers,setallUsers]=useState([])
    const [updated,setUpadate]=useState(false)
    window.scroll(0,0)
    const handleDashboard = (menu) => {
        if (menu == 'classes') {
            setDashboard('classes')
        }
        else if (menu == 'users') {
            setDashboard('users')
        }
    }

    useEffect(() => {
        fetch('https://melodic-adventure-server.vercel.app/allusers')
            .then(res => res.json())
            .then(result => {
                setallUsers(result)
            })
            setUpadate(false)
    }, [updated])

    return (
        <div>
            <div className="drawer  lg:drawer-open font-nunito sticky top-0">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-warning drawer-button lg:hidden">Open Menu</label>
                    {
                        dashboard == 'classes' && <ManageClass></ManageClass>
                    }

                    {
                        dashboard == 'users' && <div>

                            <div className="text-3xl font-bold text-center"><h1>Manage All Users</h1></div>
                            <div>

                            <div className="overflow-x-auto font-nunito">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr>
           
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>role</th>
                                          
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row 1 */}
                                       {allUsers.filter(user=>user.email!='admin@gmail.com').map(user=><AdminTableRow
                                       
                                       key={user._id}
                                       user={user}
                                       setUpadate={setUpadate}
                                       ></AdminTableRow>)}
                                    </tbody>
                                    {/* foot */}
                                    <tfoot>
                                        <tr>
                                      
                                            <th>Name</th>
                                            <th>email</th>
                                            <th>role</th>
                                    
                                        </tr>
                                    </tfoot>

                                </table>
                            </div>

                        </div>

                        </div>
                    }

                </div>
                <div className="drawer-side ">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <h1 className='font-bold text-xl text-center'>Admin Dashboard</h1>
                    <ul className="menu p-4 w-60 h-full bg-base-200 gap-10  text-base-content text-center flex flex-col justify-start items-center  font-bold">

                        {/* Sidebar content here */}
                        <li onClick={() => handleDashboard('classes')} className='mt-12'><a><FontAwesomeIcon icon={faSchoolCircleExclamation} />Manage Classes</a></li>
                        <li onClick={() => handleDashboard('users')}> <a><FontAwesomeIcon icon={faUser} />Manage Users</a></li>
                    </ul>

                </div>
            </div>
        </div >
    );
};

export default AdminDashboard;