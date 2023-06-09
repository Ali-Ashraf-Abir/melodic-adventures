import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const EnrolledClass = () => {

    
    const {loading,user}=useContext(AuthContext)
    const [userData,setUserData]=useState()

    useEffect(()=>{
        
        if (user && !loading) {
            fetch(`http://localhost:5000/currentuser/${user.email.toLowerCase()}`)
                .then(res => res.json())
                .then(result => {

                    setUserData(result[0])
                })
            }
    
    },[loading])



    return (
        <div>
              <div className="font-nunito text-3xl font-bold text-center mt-6"><p>Your Enrolled Classes</p></div>
                {
                     userData?.payments?        <div className="mt-6 grid lg:grid-cols-2 grid-cols-1 lg:w-900px w-full gap-6">
                     {
                         userData?.payments?.map(classes=><div className="card lg:w-96  w-[full] bg-base-100 shadow-xl image-full">
                         <figure><img src={classes?.Class?.img} alt="Shoes" /></figure>
                         <div className="card-body">
                           <h2 className="card-title">{classes?.Class?.name}</h2>
                           <p>{classes?.Class?.description?.slice(0,40)+'....'}</p>
                           <div className="card-actions justify-end">
                             <button className="btn btn-primary">Watch Now</button>
                           </div>
                         </div>
                       </div>)
                     }
                 </div>:<div className="text-xl mt-6 text-center"><h1>No Enrolled Classes Found</h1></div>
                }
              
        </div>
    );
};

export default EnrolledClass;