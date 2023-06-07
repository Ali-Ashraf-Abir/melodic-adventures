import React, { useContext } from 'react';
import swal from 'sweetalert';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const MyClassesCard = ({ singleClass, setDeleted }) => {


    const { user } = useContext(AuthContext)

    const id = singleClass._id

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
                    swal("Your imaginary file is safe!");
                }
            });



    };

    const handleEditClass = () => {






    }


    return (
        <div>
            <div className="card w-96 glass">
                <figure><img src={singleClass.img} alt="car!" className='h-[230px]' /></figure>
                <div className="card-body">
                    <h2 className="card-title">{singleClass.name}</h2>
                    <p>{singleClass.description.slice(0, 30) + '...'}</p>
                    <div className="card-actions justify-end">
                        <button onClick={() => handleDelete(singleClass._id)} className="btn btn-primary">Delete</button>
                        <label htmlFor={singleClass._id} className="btn">Edit</label>

                        {/* Put this part before </body> tag */}

                    </div>
                </div>
            </div>
            <input type="checkbox" id={singleClass._id} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <form action="" className='flex flex-col justify-center items-center w-100% p-20 '>



                        <div className="flex flex-col lg:flex-row mt-10 justify-center items-center gap-5">
                            <p>Name:</p>
                            <input required value={singleClass.name} type="text" name='name' placeholder="Enter Class Name" className="mr-10 input full max-w-xs" />

                            <br></br>
                        </div>
                        <div className="mt-10 flex flex-col lg:flex-row  justify-center items-center gap-5">
                            <p>Price:</p>
                            <input required value={singleClass.price} type="text" name='price' placeholder="Price" className="input w-full max-w-xs " />


                            <br></br>
                        </div>
                        <div className="mt-10 flex flex-col lg:flex-row justify-center items-center gap-5">
                            <p>Description</p>
                            <textarea required value={singleClass.classDescritption} name="ClassDescription" placeholder="Class Description" className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                            <p>Email:</p>
                            <input required type="email" name='email' placeholder="email" value={user?.email} className="input w-full max-w-xs" />
                        </div>



                        <input className='btn btn-warning mt-10 w-[40%] mx-auto' type="submit" value="Submit" />


                    </form>
                </div>
                <label className="modal-backdrop" htmlFor={singleClass._id}>Close</label>
            </div>
        </div>
    );
};

export default MyClassesCard;