import React, { useEffect, useState } from 'react';
import { faCoffee, faUser, faUserAlt, faSchoolCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyClasses from '../InstructorDashboard/MyClasses';
import StudentMyClasses from './MyClasses';

const StudendDashboard = () => {
    window.scroll(0,0)
    const [dashboard, setDashboard] = useState('enrolled class')

    const handleDashboard = (menu) => {
        if (menu == 'enrolled class') {
            setDashboard('enrolled class')
        }
        else if (menu == 'my class') {
            setDashboard('my class')
        }
    }
    return (
        <div>
            <div className="drawer  lg:drawer-open font-nunito sticky top-0">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-warning drawer-button lg:hidden">Open Menu</label>
                    {
                        dashboard == 'enrolled class' && <div>

                            <h1>this is enrolled class</h1>

                        </div>
                    }

              
                    {
                        dashboard == 'my class' && <div>

                            
                            <StudentMyClasses></StudentMyClasses>

                        </div>
                    }
                  

                </div>
                <div className="drawer-side ">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <h1 className='font-bold text-xl text-center'>Student Dashboard</h1>
                    <ul className="menu p-4 w-60 h-full bg-base-200 gap-10  text-base-content text-center flex flex-col justify-start items-center  font-bold">

                        {/* Sidebar content here */}
                        <li onClick={() => handleDashboard('enrolled class')} className='mt-12'><a><FontAwesomeIcon icon={faSchoolCircleExclamation} />My enrolled classes</a></li>
                        <li onClick={() => handleDashboard('my class') }> <a><FontAwesomeIcon icon={faUser} />My Classes</a></li>
                </ul>

            </div>
        </div>
        </div >
    );
};

export default StudendDashboard;