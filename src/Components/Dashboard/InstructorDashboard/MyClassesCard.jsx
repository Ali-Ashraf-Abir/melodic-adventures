import React from 'react';

const MyClassesCard = ({singleClass}) => {


    const handleDelete=(id)=>{

        fetch(`http://localhost:5000/deleteClass/${id}`,{
            method:'DELETE'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })

    }



    return (
        <div>
            <div className="card w-96 glass">
                <figure><img src={singleClass.img} alt="car!" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{singleClass.name}</h2>
                    <p>{singleClass.description.slice(0,30)+'...'}</p>
                    <div className="card-actions justify-end">
                        <button onClick={()=>handleDelete(singleClass._id)} className="btn btn-primary">Delete</button>
                        <button className="btn btn-primary">Edit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyClassesCard;