import React, { useEffect, useState } from 'react';
import { faCoffee,faMoneyBill, faUser, faUserAlt, faSchoolCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyClasses from '../InstructorDashboard/MyClasses';
import StudentMyClasses from './MyClasses';
import EnrolledClass from './EnrolledClass';
import PaymentHistory from './PaymentHistory';

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
        else if (menu == 'payment history') {
            setDashboard('payment history')
        }
    }
    return (
        <div>
            <div className="drawer  lg:drawer-open font-nunito">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center ">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn sticky top-[0] z-10 btn-warning drawer-button lg:hidden">Open Menu</label>
                    {
                        dashboard == 'enrolled class' && <div>

                            <EnrolledClass></EnrolledClass>

                        </div>
                    }

              
                    {
                        dashboard == 'my class' && <div>

                            
                            <StudentMyClasses></StudentMyClasses>

                        </div>
                    }
                    
                    {
                        dashboard == 'payment history' && <div>

                            
                            <PaymentHistory></PaymentHistory>

                        </div>
                    }

                </div>
                <div className="drawer-side sticky top-[0] z-[10]">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <h1 className='font-bold text-xl text-center'>Student Dashboard</h1>
                    <ul className="menu p-4 w-60 h-full bg-base-200 gap-10  text-base-content text-center flex flex-col justify-start items-center  font-bold">

                        {/* Sidebar content here */}
                        <li onClick={() => handleDashboard('enrolled class')} className='mt-12'><a><FontAwesomeIcon icon={faSchoolCircleExclamation} />My enrolled classes</a></li>
                        <li onClick={() => handleDashboard('my class') }> <a><FontAwesomeIcon icon={faUser} />My Classes</a></li>
                        <li onClick={() => handleDashboard('payment history') }> <a><FontAwesomeIcon icon={faMoneyBill} />Payment History</a></li>
                </ul>

            </div>
        </div>
        </div >
    );
};

export default StudendDashboard;