import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import ClassesCard from './ClassesCard';

const Classes = () => {



    const{loading,enrolled}=useContext(AuthContext)
    const [classes,setClasses]=useState()
    const [added,setAdded]=useState(false)
    const [dataLoading,SetDataLoading]=useState(true)
    useEffect(()=>{

        fetch('http://localhost:5000/allclasses')
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            setClasses(result)
        })


        setAdded(false)
        SetDataLoading(false)

    },[added,enrolled])



    return (
        <div>
            <div className="h-200px text-center font-bold border-b-4 border-primary py-6 text-3xl font-nunito"><p>All Classes</p></div>
           
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:w-[900px] w-[100%] mx-auto mt-[30px] gap-6">
                {
                classes?.filter(singleClass=>singleClass.status!='denied'&&singleClass.status!='pending').map(singleClass=><ClassesCard
                
                    key={singleClass._id}
                    singleClass={singleClass}
                    setAdded={setAdded}
                    added={added}
                    dataLoading={dataLoading}
                    SetDataLoading={SetDataLoading}
                ></ClassesCard>)
            }
                </div>
        </div>
    );
};

export default Classes;