import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';

import AdminDashboard from './AdminDashboard/AdminDashboard';
import InstructorDashboard from './InstructorDashboard/InstructorDashboard';
import StudendDashboard from './StudentDashboard/StudendDashboard';



const Dashboard = () => {
    const { user,loading } = useContext(AuthContext)
    
    const [userData, setData] = useState([])
    
    const [dataLoading,setDataLoading]=useState(true)

    useEffect(()=>{
        if(!userData){
            setDataLoading(true)
        }
        if (user && !loading) {
            fetch(`https://melodic-adventure-server-ali-ashraf-abir.vercel.app/currentuser/${user.email.toLowerCase()}`)
                .then(res => res.json())
                .then(result => {
                 
                    setData(result)
                    setDataLoading(false)
                })
            }
    
    },[loading])

    console.log(user.email)
    
    
    return (
      <div className="">
          {
              dataLoading? <div className="text-center"><span className="loading loading-dots loading-lg"></span></div>:  <div>
              {userData[0]?.role == 'admin' && <AdminDashboard></AdminDashboard>}
              {userData[0]?.role == 'instructor' && <InstructorDashboard></InstructorDashboard>}
              {userData[0]?.role == 'student' && <StudendDashboard></StudendDashboard>}
          </div>
          }
      </div>
    );
};

export default Dashboard;