import React from 'react';

const AdminTableRow = ({ user,setUpadate }) => {

    const handleMakeAdmin = (email) => {

        swal({
            title: "Are you sure?",
            text: "You Want To Make This User An Admin?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`https://melodic-adventure-server-ali-ashraf-abir.vercel.app/manageuser/${email}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ role: 'admin' })
                    })
                        .then(res => res.json())
                        .then(result => {
                           
                        })
                        setUpadate(true)
                    swal("This user is now an Admin?", {
                        icon: "success",
                    });
                } else {
                    swal("Decision Denied");
                }
            });




    }

    const handleMakeInstructor = (email) => {

        swal({
            title: "Are you sure?",
            text: "You Want To Make This User An Instructor?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`https://melodic-adventure-server-ali-ashraf-abir.vercel.app/manageuser/${email}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ role: 'instructor' })
                    })
                        .then(res => res.json())
                        .then(result => {
                           
                        })
                        setUpadate(true)
                    swal("This user is now an Instructor?", {
                        icon: "success",
                    });
                } else {
                    swal("Decision Denied");
                }
            });




    }


    return (

        <tr>

            <td>
                <div className="flex items-center space-x-3">

                    <div>
                        <div className="font-bold">{user.name || 'no name found'}</div>
                    </div>
                </div>
            </td>
            <td>


                <span className="font-bold">{user.email}</span>
            </td>
            <td className="font-bold">{user.role}</td>
            <th>
                <button onClick={() => handleMakeAdmin(user.email)} className="btn btn-primary btn-xs">make admin</button>
            </th>
            <th>
                <button onClick={()=>handleMakeInstructor(user.email)} className="btn btn-primary btn-xs">make instructor</button>
            </th>
        </tr>


    );
};

export default AdminTableRow;