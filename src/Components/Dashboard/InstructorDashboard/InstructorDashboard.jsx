import React, { useEffect, useState } from 'react';
import { faCoffee, faUser, faUserAlt, faSchoolCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Addaclass from './Addaclass';
import MyClasses from './MyClasses';

const InstructorDashboard = () => {
    const [dashboard, setDashboard] = useState('add class')

    const handleDashboard = (menu) => {
        if (menu == 'add class') {
            setDashboard('add class')
        }
        else if (menu == 'my class') {
            setDashboard('my class')
        }
    }
    return (
        <div>
            <div className="drawer  lg:drawer-open font-nunito ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-warning drawer-button lg:hidden">Open Menu</label>
                    {
                        dashboard == 'add class' && <div>

                            <Addaclass></Addaclass>

                        </div>
                    }

                    {
                        dashboard == 'my class' && <div>


                            <MyClasses></MyClasses>

                        </div>
                    }

                </div>
                
                <div className="drawer-side lg:sticky top-[0] z-[1000] ">
                
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <h1 className='font-bold text-xl text-center'>Instructor Dashboard</h1>
                    <ul className="menu p-4 w-60 h-full bg-base-200 gap-10  text-base-content text-center flex flex-col justify-start   font-bold">

                        {/* Sidebar content here */}
                        <li onClick={() => handleDashboard('add class')} className='mt-12'><a><FontAwesomeIcon icon={faSchoolCircleExclamation} />Add a class</a></li>
                        <li onClick={() => handleDashboard('my class') }> <a><FontAwesomeIcon icon={faUser} />My Classes</a></li>
                </ul>

            </div>
        </div>
        </div >
    );
};

export default InstructorDashboard;