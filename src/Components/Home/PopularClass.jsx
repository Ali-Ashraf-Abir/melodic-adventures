import React, { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';

const PopularClass = () => {
    const { loading, user, setLoading } = useContext(AuthContext)
    const [data, setData] = useState()

    const [classdata, setClassData] = useState(null)
    const navigate = useNavigate()
    const [addedclass, setAddedClass] = useState([])

    const [dataLoading,SetDataLoading]=useState(true)

    const [added,setAdded]=useState(false)

    useEffect(() => {

        if (!data) {
            SetDataLoading(true)
        }

        if (user && !loading) {
            fetch(`https://melodic-adventure-server-ali-ashraf-abir.vercel.app/currentuser/${user?.email.toLowerCase()}`)
                .then(res => res.json())
                .then(result => {

                    SetDataLoading(false)
                    setData(result[0])

                })
        }

    }, [loading, added, data])
    
    console.log(data)

    useEffect(() => {

        fetch('https://melodic-adventure-server-ali-ashraf-abir.vercel.app/popularclasses')
            .then(res => res.json())
            .then(data => {
                setClassData(data)
            })

    }, [])


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
                            console.log(result)
                        })

                    swal("This Class is now Added To your dashboard", {
                        icon: "success",

                    });
                    setAdded(true)
                } else {
                    swal("Decision Denied");
                }
            });




    }


    return (
        <div>
            <div className="font-nunito text-3xl font-bold text-center mt-6 border-b-4 border-primary"><p>Popular Classes</p></div>
                <div className="grid lg:grid-cols-2 grid-cols-1  gap-6 lg:w-[900px] mt-[20px] w-full mx-auto">
                {
                classdata?.slice(0, 6).map(Class =><div className="card w-96 bg-base-100 shadow-xl image-full">
                    <figure><img src={Class.img} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{Class.name}</h2>
                        <p>{Class.description.slice(0,100)+'....'}</p>
                        <div className="card-actions justify-end ">
                        <button onClick={() => handleAppliedclasses(user?.email, user,Class)} disabled={data?.role == 'admin' ? true : data?.role == 'instructor' ? true : Class.seats == '0' ? true : data?.addedClasses?.find(singleClass => singleClass._id == Class._id) ? true : false} className={`btn btn-primary ${Class.seats == '0' && 'disabled'} ${user?.role == 'admin' ? 'disabled' : user?.role == 'instructor' && 'disabled'}`}>{data?.addedClasses?.find(singleClass => singleClass._id == Class._id) ? 'already Added' : 'Add to list'}</button>
                        </div>
                    </div>
                </div>

                )
            }
    
                </div>
                {
                data?.length>6?<div className='text-center mt-6'><Link to='/classes'><button className='btn btn-warning'>See More</button></Link></div>:''
            }
        </div>
    );
};

export default PopularClass;