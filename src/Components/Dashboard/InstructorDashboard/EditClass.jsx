import React from 'react';

const EditClass = ({classes}) => {
    return (
        <div>
            <div className="text-center text-3xl py-10">Update your Product</div>
            <dialog id={`my_modal_${classes._id}`} className="modal">
                <form method="dialog" className="modal-box w-11/12 max-w-5xl">
                    <form action="" className='flex flex-col justify-center items-center w-100% p-20 '>



                        <div className="flex flex-col lg:flex-row mt-10 justify-center items-center gap-5">
                            <p>Name:</p>
                            <input required type="text" name='name' placeholder="Enter Class Name" className="mr-10 input full max-w-xs" />

                            <br></br>
                        </div>
                        <div className="mt-10 flex flex-col lg:flex-row  justify-center items-center gap-5">
                            <p>Price:</p>
                            <input required type="text" name='price' placeholder="Price" className="input w-full max-w-xs " />


                            <br></br>
                        </div>
                        <div className="mt-10 flex flex-col lg:flex-row justify-center items-center gap-5">
                            <p>Description</p>
                            <textarea required name="ClassDescription" placeholder="Class Description" className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                            <p>Email:</p>
                            <input required type="email" name='email' placeholder="email" value={user?.email} className="input w-full max-w-xs" />
                        </div>



                        <input className='btn btn-warning mt-10 w-[40%] mx-auto' type="submit" value="Submit" />


                    </form>
                    <div className="modal-action">
                        {/* if there is a button, it will close the modal */}
                        <button className="btn">Close</button>
                    </div>
                </form>
            </dialog>



        </div>
    );
};

export default EditClass;