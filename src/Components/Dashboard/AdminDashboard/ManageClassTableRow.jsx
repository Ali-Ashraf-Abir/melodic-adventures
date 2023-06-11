import React from 'react';
import swal from 'sweetalert';

const ManageClassTableRow = ({ singleClass, setUpdated }) => {

    const handleApproved = (id) => {

        swal({
            title: "Are you sure?",
            text: "You Want To approve this class?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`https://melodic-adventure-server-ali-ashraf-abir.vercel.app/manageclass/${id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ status: 'approved' })
                    })
                        .then(res => res.json())
                        .then(result => {
                    
                            setUpdated(true)
                        })

                    swal("the class is approved", {
                        icon: "success",
                    });
                } else {
                    swal("Decision Denied");
                }
            });




    }

    const handleDenied = (id) => {

        swal({
            title: "Are you sure?",
            text: "You want To deny this class?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`https://melodic-adventure-server-ali-ashraf-abir.vercel.app/manageclass/${id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ status: 'denied' })
                    })
                        .then(res => res.json())
                        .then(result => {
                       
                            setUpdated(true)
                        })

                    swal("the class is denied", {
                        icon: "success",
                    });
                } else {
                    swal("Decision Denied");
                }
            });




    }

    const handleGetFeedback = (event) => {

        event.preventDefault()

        const form = event.target
        const feedback = form.feedback.value
        const id=form.id.value
      
  
        swal({
            title: "Are you sure?",
            text: "Is this your feedback?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`https://melodic-adventure-server-ali-ashraf-abir.vercel.app/givefeedback/${id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({feedback: feedback })
                    })
                        .then(res => res.json())
                        .then(result => {
                     
                            setUpdated(true)
                        })

                    swal("Feedback Sent", {
                        icon: "success",
                    });
                } else {
                    swal("Decision Denied");
                }
            });


    }


    // const handleFeedback = (id) => {


    //     const feedback=handleGetFeedback()

    //     swal({
    //         title: "Are you sure?",
    //         text: "You Want To approve this class?",
    //         icon: "warning",
    //         buttons: true,
    //         dangerMode: true,
    //     })
    //         .then((willDelete) => {
    //             if (willDelete) {
    //                 fetch(`https://melodic-adventure-server-ali-ashraf-abir.vercel.app/manageclass/${id}`, {
    //                     method: 'PUT',
    //                     headers: {
    //                         'content-type': 'application/json'
    //                     },
    //                     body: JSON.stringify({ status: 'denied' })
    //                 })
    //                     .then(res => res.json())
    //                     .then(result => {
    //                         console.log(result)
    //                         setUpdated(true)
    //                     })

    //                 swal("the class is approved", {
    //                     icon: "success",
    //                 });
    //             } else {
    //                 swal("Decision Denied");
    //             }
    //         });




    // }




    return (

        <tr>

            <td>
                <div className="flex items-center space-x-3">

                    <div>
                        <div className="font-bold">{singleClass.name || 'no name found'}</div>
                    </div>
                </div>
            </td>
            <td>


                <span className="font-bold">{singleClass.email}</span>
            </td>
            <td className="font-bold">{singleClass.status}</td>
            <th>
                <button onClick={() => { handleApproved(singleClass._id) }} className="btn btn-primary btn-success btn-xs">approve</button>
            </th>
            <th>
                <button onClick={() => { handleDenied(singleClass._id) }} className="btn btn-primary btn-warning btn-xs">denied</button>
            </th>
            <th><label htmlFor={singleClass._id} className="btn btn-xs">give feedback</label>

                {/* Put this part before </body> tag */}
                <input type="checkbox" id={singleClass._id} className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                        <div className="text-center text-xl">
                            Write your feedback to the instructor
                        </div>
                        <div className="">
                            <form onSubmit={handleGetFeedback} className='flex flex-col justify-center items-center' action="">
                                <input type='text' name='id' value={singleClass._id} className='hidden'></input>
                                <input type='text' name='status' value={singleClass.status} className='hidden'></input>
                            <textarea placeholder="Feedback" name='feedback' className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                            <input type='submit' className='btn btn-warning mt-4' value='submit'></input>
                            </form>
                        </div>
                        <div className="modal-action">
                            <label htmlFor={singleClass._id} className="btn">Close!</label>
                        </div>
                    </div>
                </div></th>
        </tr>

    );
};

export default ManageClassTableRow;