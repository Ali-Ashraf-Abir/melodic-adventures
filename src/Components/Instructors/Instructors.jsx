import React, { useEffect, useState } from 'react';
import InstructorCard from './InstructorCard';

const Instructors = () => {

    const [data,setData]=useState()


    useEffect(()=>{

        fetch('http://localhost:5000/getinstructors')
        .then(res=>res.json())
        .then(result=>{
            setData(result)
        })

    


    },[])
    console.log(data)
    return (
        <div>
            <div className="text-3xl text-center font-nunito bg-warning py-12"><h1>Our Instructors</h1></div>
            
            <div className="">
                {
                    data?.map(instructor=><InstructorCard
                    
                     
                        instructor={instructor}
                    
                    ></InstructorCard>)
                }
            </div>
        </div>
    );
};

export default Instructors;