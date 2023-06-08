import React, { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../AuthProvider/AuthProvider';

const ClassesCard = ({singleClass}) => {
    const {loading,user}=useContext(AuthContext)
    const [data,setData]=useState()
    const [addedclass,setAddedClass]=useState([])
    useEffect(()=>{
        
        if (user && !loading) {
            fetch(`http://localhost:5000/currentuser/${user.email.toLowerCase()}`)
                .then(res => res.json())
                .then(result => {
        
                    setData(result[0])
                })
            }
    
    },[loading])




    const [appliedclasses,setAppliedclasses] = useState([])
   
    const handleAppliedclasses = (email,id) => {

        swal({
            title: "Are you sure?",
            text: "You Want To Make This User An Admin?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`http://localhost:5000/manageuseraddclass/${email}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ addedClass : [singleClass] })
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result)
                        })

                    swal("This user is now an Admin?", {
                        icon: "success",
                    });
                } else {
                    swal("Decision Denied");
                }
            });




    }

    return (
        <div>
            <Toaster></Toaster>
            <div className="card w-96 bg-base-100 shadow-xl font-nunito">
                <figure><img src={singleClass.img} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{singleClass.name}</h2>
                    <p>{singleClass.description.slice(0,30)+'......'}</p>
                    <p>price:{singleClass.price}$</p>
                    <p>rating:{singleClass.rating}</p>
                    <p>Available seats:{singleClass.seats}</p>
                    <p>Total Enrolled:{singleClass.totalEnrolled}</p>
                    <div className="card-actions justify-end">
                        <button disabled={data?.role=='admin'?true:data?.role=='instructor'?true:singleClass.seats=='0'?true:false} className={`btn btn-primary $ ${user?.role=='admin'?'disabled':user?.role=='instructor'&&'disabled'}`}>Enroll Now</button>
                        <button onClick={()=>handleAppliedclasses(user.email)} disabled={data?.role=='admin'?true:data?.role=='instructor'?true:singleClass.seats=='0'?true:false} className={`btn btn-primary ${singleClass.seats=='0'&& 'disabled'} ${user?.role=='admin'?'disabled':user?.role=='instructor'&&'disabled'}`}>Add to list</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassesCard;