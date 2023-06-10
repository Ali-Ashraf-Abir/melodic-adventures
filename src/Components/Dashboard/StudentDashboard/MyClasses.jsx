import React, { useContext, useEffect, useState } from 'react';
import { UNSAFE_DataRouterStateContext } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import StudentClassesCard from './StudentClassesCard';

const StudentMyClasses = () => {
    const { user,loading } = useContext(AuthContext)
    window.scroll(0,0)
    const [userData, setData] = useState()
    const [deleted,setDeleted]=useState(false)
    const [data,setUserData]=useState()

    useEffect(()=>{
        
        if (user && !loading) {
            fetch(`https://melodic-adventure-server-ali-ashraf-abir.vercel.app/currentuser/${user.email.toLowerCase()}`)
                .then(res => res.json())
                .then(result => {

                    setData(result[0].addedClasses)
                    setDeleted(false)
                    setUserData(result[0])
                })
            }
    
    },[loading,deleted])


    return (

        <div>
            <div className="font-nunito text-3xl font-bold text-center"><p>Your Classes</p></div>
            {
                userData?<div className="grid lg:grid-cols-2 grid-cols-1 lg:w-[900px] mt-[20px]">
                {
                    userData?.map(singleClass=><StudentClassesCard
                    
                    key={singleClass._id}
                    singleClass={singleClass}
                    data={userData}
                    userData={data}
                    setDeleted={setDeleted}
                    ></StudentClassesCard>)
                }
                  </div>:<div className="text-xl mt-6 text-center"><h1>No Added Classes Found</h1></div>
            }
        </div>
    );
};

export default StudentMyClasses;