
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
const PopularInstructorCards = ({ instructor }) => {



    const { user, loading } = useContext(AuthContext)
    const [classes, setClasses] = useState()
    const [data, setData] = useState()
    const [dataLoading, setDataLoading] = useState(true)
    const [updated,setUpdated]=useState()
    const navigate = useNavigate()

    useEffect(() => {
        if (!data) {
            setDataLoading(true)
        }


        if (user && !loading) {
            fetch(`https://melodic-adventure-server-ali-ashraf-abir.vercel.app/currentuser/${user.email.toLowerCase()}`)
                .then(res => res.json())
                .then(result => {

                    setData(result[0])
                    setDataLoading(false)
                    
                })
        }
        fetch(`https://melodic-adventure-server-ali-ashraf-abir.vercel.app/currentuserclass/${instructor.email}`)
        .then(res => res.json())
        .then(result => {

            setClasses(result)
            setUpdated(false)
        })

    }, [loading,updated])



    const handleShowClass = (email) => {


  




    }
    const handleAppliedclasses = (email, user,singleClass) => {

        if (!user) {
            navigate('/login')

            return

        }

        swal({
            title: "Are you sure?",
            text: "you want to add this class to your list?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`https://melodic-adventure-server-ali-ashraf-abir.vercel.app/manageuseraddclass/${email}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ addedClass: [singleClass] })
                    })
                        .then(res => res.json())
                        .then(result => {
              
                        })

                    swal("This Class is now Added To your dashboard", {
                        icon: "success",
                    
                    });
                    setUpdated(true)
                } else {
                    swal("Decision Denied");
                }
            });

    }








    return (
        <div>
            <div className="card lg:w-96 w-[100%] glass font-nunito">
                <figure>< img  className='lg:w-[300px] lg:h-[300px]' src={instructor.imageUrl} alt="car!" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{instructor.name}</h2>
                    <p>Email:{instructor.email}</p>
                    <div className="card-actions justify-end">
                        <label htmlFor={instructor._id} className="btn">Show Classes</label>

                        {/* Put this part before </body> tag */}
                        {/* You can open the modal using ID.showModal() method */}
                        <input type="checkbox" id={instructor._id} className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box">
                                <div className="overflow-y-auto">
                                    <div className="overflow-x-auto">
                                        <table className="table">
                                            {/* head */}
                                            <thead>
                                                <tr>
                                                    <th>Image</th>
                                                    <th></th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* row 1 */}
                                                {
                                                    dataLoading ? <div className=""><span className="loading loading-ring loading-lg"></span></div> :
                                                        classes?.map(Class => <tr>
                                                            <th>
                                                                <div className="avatar">
                                                                    <div className="mask mask-squircle w-12 h-12">
                                                                        <img src={Class?.img} alt="Avatar Tailwind CSS Component" />
                                                                    </div>
                                                                </div>

                                                            </th>
                                                            <td>
                                                                <div className="flex items-center space-x-3">

                                                                </div>
                                                            </td>
                                                            <td>
                                                                {Class?.name ? Class.name : 'No Class Available'}
                                                                <br />
                                                                <span className="badge badge-ghost badge-sm">Available Seats:{Class.seats}</span>
                                                            </td>
                                                            <td>{Class.price}</td>
                                                            <th>
                                                                <button onClick={() => handleAppliedclasses(user?.email, user,Class)} disabled={data?.role == 'admin' ? true : data?.role == 'instructor' ? true : Class.seats == '0' ? true : data?.addedClasses?.find(singleClass => singleClass._id == Class._id) ? true : false} className={`btn btn-primary ${Class.seats == '0' && 'disabled'} ${user?.role == 'admin' ? 'disabled' : user?.role == 'instructor' && 'disabled'}`}>{data?.addedClasses?.find(singleClass => singleClass._id == Class._id) ? 'already Added' : 'Add to list'}</button>
                                                            </th>
                                                        </tr>)
                                                }


                                            </tbody>
                                            {/* foot */}
                                            <tfoot>
                                                <tr>

                                                    <th>Image</th>
                                                    <th></th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th></th>
                                                </tr>
                                            </tfoot>

                                        </table>
                                    </div>

                                </div>

                                <div className="modal-action">
                                    <label htmlFor={instructor._id} className="btn">Close!</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularInstructorCards;