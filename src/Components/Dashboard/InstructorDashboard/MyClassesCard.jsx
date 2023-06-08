import React, { useContext, useState } from 'react';
import swal from 'sweetalert';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const MyClassesCard = ({ singleClass, setDeleted, setUpdated }) => {


    const { user } = useContext(AuthContext)

    const id = singleClass._id

    const [classes, SetClasses] = useState({})

    const handleDelete = (id) => {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                    fetch(`http://localhost:5000/deleteClass/${id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if (data.deletedCount === 1) {
                                setDeleted(true)
                            }

                        })



                } else {
                    swal("Your file is safe!");
                }
            });



    };



    const handleEditClass = (event) => {

        event.preventDefault()

        const form = event.target
        const name = form.name.value
        const price = form.price.value
        const description = form.ClassDescription.value
        const email = form.email.value
        const id = form.id.value
        const seats = form.seats.value

        const Class = { name, price, description, id,seats }

        console.log(Class)

        fetch(`http://localhost:5000/updateclass/${id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(Class),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount === 1) {
                    setUpdated(true)
                    swal('class updated')
                }

            })






    }


    // const handleEdit=(id,classes)=>{
    //     console.log(id)
    //     fetch(`http://localhost:5000/updateclass/${id}`, {
    //         method: 'PUT',
    //         body :JSON.stringify(classes)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             if (data.modifiedCount === 1) {
    //                 setUpdated(true)
    //             }

    //         })
    // }


    return (
        <div>
            <div className="card w-96 glass">
                <figure><img src={singleClass.img} alt="car!" className='h-[230px]' /></figure>
                <div className="card-body">
                    <h2 className="card-title">{singleClass.name}</h2>
                    <p>{singleClass?.description?.slice(0, 30) + '...'}</p>
                    <p>Total Enrolled:{singleClass?.totalEnrolled}</p>
                    <p>Available Seats :{singleClass?.seats}</p>
                    <button className={`btn btn-xs w-[30%] ${singleClass.status == 'pending' ? 'btn-warning' : singleClass.status == 'approved' ? 'btn-primary' : singleClass.status && 'btn-danger'}`}>{singleClass.status}</button>

                    <div className="card-actions justify-end">
                        <label htmlFor={singleClass._id} className="btn">Show Feedback</label>

                        {/* Put this part before </body> tag */}
                        <input type="checkbox" id={singleClass._id} className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box">
                                <h3 className="text-lg font-bold">Admin FeedBack</h3>
                                <p className="py-4">{singleClass.feedback==''?'no feedback given yet':singleClass.feedback}</p>
                            </div>
                            <label className="modal-backdrop" htmlFor={singleClass._id}>Close</label>
                        </div>
                        <button onClick={() => handleDelete(singleClass._id)} className="btn btn-error">Delete</button>
                        <label htmlFor={singleClass.name} className="btn btn-warning">Edit</label>



                    </div>
                </div>
            </div>
            <input type="checkbox" id={singleClass.name} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl bg-gray-300">
                    <div className="text-center text-3xl font-nunito font-bold"><h1 className=''>Edit Your Class</h1></div>
                    <form onSubmit={handleEditClass} action="" className='flex flex-col justify-center items-center w-100% p-20 '>



                        <div className="flex flex-col lg:flex-row mt-10 justify-center items-center gap-5">
                            <p>Name:</p>
                            <input required defaultValue={singleClass.name} type="text" name='name' placeholder="Enter Class Name" className="mr-10 input full max-w-xs" />
                            <input required defaultValue={singleClass._id} type="text" name='id' placeholder="Enter Class Name" className="mr-10 input full max-w-xs hidden" />
                            <p>Seats:</p>
                            <input required defaultValue={singleClass.seats} type="text" name='seats' placeholder="Available Seats" className="mr-10 input full max-w-xs" />
                            <br></br>
                        </div>
                        <div className="mt-10 flex flex-col lg:flex-row  justify-center items-center gap-5">
                            <p>Price:</p>
                            <input required defaultValue={singleClass.price} type="text" name='price' placeholder="Price" className="input w-full max-w-xs " />


                            <br></br>
                        </div>
                        <div className="mt-10 flex flex-col lg:flex-row justify-center items-center gap-5">
                            <p>Description</p>
                            <textarea required defaultValue={singleClass.description} name="ClassDescription" placeholder="Class Description" className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                            <p>Email:</p>
                            <input required type="email" name='email' placeholder="email" value={user?.email} className="input w-full max-w-xs" />
                        </div>



                        <input className='btn btn-warning mt-10 w-[40%] mx-auto' type="submit" value="Submit" />


                    </form>
                </div>
                <label className="modal-backdrop" htmlFor={singleClass.name}>Close</label>
            </div>
        </div>
    );
};

export default MyClassesCard;