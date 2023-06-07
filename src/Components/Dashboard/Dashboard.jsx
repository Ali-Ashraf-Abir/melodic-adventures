import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';

import AdminDashboard from './AdminDashboard/AdminDashboard';
import InstructorDashboard from './InstructorDashboard/InstructorDashboard';
import StudendDashboard from './StudentDashboard/StudendDashboard';



const Dashboard = () => {
    const { user,loading } = useContext(AuthContext)
    
    const [userData, setData] = useState([])


    useEffect(()=>{
        
        if (user && !loading) {
            fetch(`http://localhost:5000/currentuser/${user.email.toLowerCase()}`)
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    setData(result)
                })
            }
    
    },[loading])

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