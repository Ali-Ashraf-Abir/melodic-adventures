import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import MyClassesCard from './MyClassesCard';

const MyClasses = () => {

    const {user,loading}=useContext(AuthContext)
    const [classes,setClasses]=useState([])
    const [deleted,setDeleted]=useState(false)

    const [updated,setUpdated]=useState(false)

    useEffect(()=>{

        fetch(`http://localhost:5000/currentuserclass/${user.email.toLowerCase()}`)
        .then(res=>res.json())
        .then(data=>{
            setClasses(data)
            console.log(data)
        })
        setDeleted(false)
        setUpdated(false)

    },[loading,deleted,updated])

    return (
        <div>
            <div className="text-center font-bold font-nunito text-3xl">
                <h1>Your Classes</h1>
            </div>
            <div className="grid lg:grid-cols-2 w-[800px] grid-cols-1 mx-auto mt-12">
        {
            classes.map(singleClass => <MyClassesCard
            key={singleClass._id}
            singleClass={singleClass}
            setDeleted={setDeleted}
            setUpdated={setUpdated}></MyClassesCard>)
        }
        </div>
        </div>
    );
};

export default MyClasses;