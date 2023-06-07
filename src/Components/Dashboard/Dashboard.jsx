import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';

import AdminDashboard from './AdminDashboard/AdminDashboard';
import InstructorDashboard from './InstructorDashboard/InstructorDashboard';
import StudendDashboard from './StudentDashboard/StudendDashboard';



const Dashboard = () => {
    const { user } = useContext(AuthContext)
    
    const [userData, setData] = useState([])


    useEffect(()=>{
        
        if (user) {
            fetch(`http://localhost:5000/currentuser/${user.email}`)
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    setData(result)
                })
            }
    },[])

    console.log(user.email)
    
    
    return (
        <div>
            {userData[0]?.role == 'admin' && <AdminDashboard></AdminDashboard>}
            {userData[0]?.role == 'instructor' && <InstructorDashboard></InstructorDashboard>}
            {userData[0]?.role == 'student' && <StudendDashboard></StudendDashboard>}
        </div>
    );
};

export default Dashboard;