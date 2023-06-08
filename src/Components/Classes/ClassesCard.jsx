import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';

const ClassesCard = ({singleClass}) => {
    const {loading,user}=useContext(AuthContext)
    const [data,setData]=useState()
    useEffect(()=>{
        
        if (user && !loading) {
            fetch(`http://localhost:5000/currentuser/${user.email.toLowerCase()}`)
                .then(res => res.json())
                .then(result => {
        
                    setData(result[0])
                })
            }
    
    },[loading])

    console.log(data)

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl font-nunito">
                <figure><img src={singleClass.img} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{singleClass.name}</h2>
                    <p>{singleClass.description.slice(0,30)+'......'}</p>
                    <p>price:{singleClass.price}$</p>
                    <p>rating:{singleClass.rating}</p>
                    <p>Available seats:{singleClass.seats}</p>
                    <div className="card-actions justify-end">
                        <button disabled={data?.role=='admin'?true:data?.role=='instructor'?true:singleClass.seats=='0'?true:false} className={`btn btn-primary $ ${user?.role=='admin'?'disabled':user?.role=='instructor'&&'disabled'}`}>Enroll Now</button>
                        <button disabled={data?.role=='admin'?true:data?.role=='instructor'?true:singleClass.seats=='0'?true:false} className={`btn btn-primary ${singleClass.seats=='0'&& 'disabled'} ${user?.role=='admin'?'disabled':user?.role=='instructor'&&'disabled'}`}>Add to list</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassesCard;