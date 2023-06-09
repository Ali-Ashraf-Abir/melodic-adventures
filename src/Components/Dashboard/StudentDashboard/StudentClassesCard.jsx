import React, { useContext, useEffect, useState } from 'react';
import { json } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const StudentClassesCard = ({singleClass,data,setDeleted}) => {

    const {loading,user}=useContext(AuthContext)
    const [Userdata,setData]=useState()

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

    function deleteCLass(data,Class,user){

        const newData= data.filter(singleData=>singleData._id!=Class._id)
        console.log (newData)
       
        fetch(`http://localhost:5000/deleteclass/${user[0]._id}`,{
            method:'put',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({addedClasses:newData})
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.modifiedCount>0){
                setDeleted(true)
            }
        })
 
 
     }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={singleClass.img} alt="Shoes" className="rounded-xl w-[300px] h-[200px]" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{singleClass?.name}</h2>
                <p>{singleClass?.description?.slice(0,30)+'...'}</p>
                <p>price:{singleClass?.price}</p>
                <p>Available seats:{singleClass?.seats}</p>
                <div className="card-actions">
                    <button className="btn btn-primary">Enroll Now!</button>
                    <button onClick={()=>deleteCLass(data,singleClass,Userdata)} className="btn btn-ghost">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default StudentClassesCard;