import React, { useEffect, useState } from 'react';
import ClassesCard from './ClassesCard';

const Classes = () => {

    
    const [classes,setClasses]=useState()

    useEffect(()=>{

        fetch('http://localhost:5000/allclasses')
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            setClasses(result)
        })

    },[])


    return (
        <div>
            <div className="h-200px text-center bg-warning py-12 text-3xl font-nunito"><p>All Classes</p></div>
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:w-[900px] w-[100%] mx-auto mt-[30px]">
                {
                classes?.filter(singleClass=>singleClass.status!='denied').map(singleClass=><ClassesCard
                
                    key={singleClass._id}
                    singleClass={singleClass}
                
                ></ClassesCard>)
            }
                </div>
        </div>
    );
};

export default Classes;