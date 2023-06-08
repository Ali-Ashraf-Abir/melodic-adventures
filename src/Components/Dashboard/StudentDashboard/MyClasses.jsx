import React, { useContext, useEffect, useState } from 'react';
import { UNSAFE_DataRouterStateContext } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import StudentClassesCard from './StudentClassesCard';

const StudentMyClasses = () => {
    const { user,loading } = useContext(AuthContext)
    
    const [userData, setData] = useState()


    useEffect(()=>{
        
        if (user && !loading) {
            fetch(`http://localhost:5000/currentuser/${user.email.toLowerCase()}`)
                .then(res => res.json())
                .then(result => {
                    console.log(result[0].addedClasses)
                    setData(result[0].addedClasses)
                })
            }
    
    },[loading])


    return (

        <div>
            <div className="font-nunito text-3xl font-bold text-center"><p>Your Classes</p></div>
                  <div className="grid lg:grid-cols-2 grid-cols-1 lg:w-[900px] w-[full] mt-[20px]">
            {
                userData?.map(singleClass=><StudentClassesCard
                
                key={singleClass._id}
                singleClass={singleClass}
                
                ></StudentClassesCard>)
            }
              </div>
        </div>
    );
};

export default StudentMyClasses;