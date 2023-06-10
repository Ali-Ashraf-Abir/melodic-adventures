import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { json } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import CheckoutForm from '../../Checkout/Checkout';
const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_API}`);
const StudentClassesCard = ({ singleClass, data, userData, setDeleted }) => {

    const { loading, user, enrolled } = useContext(AuthContext)
    const [Userdata, setData] = useState()

    useEffect(() => {

        if (user && !loading) {
            fetch(`https://melodic-adventure-server.vercel.app/currentuser/${user.email.toLowerCase()}`)
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    setData(result)
                })
        }

    }, [loading, enrolled])

    function deleteCLass(data, Class, user) {

        const newData = data.filter(singleData => singleData._id != Class._id)
        console.log(newData)

        fetch(`https://melodic-adventure-server.vercel.app/deleteclass/${user[0]._id}`, {
            method: 'put',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ addedClasses: newData })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
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
                <p>{singleClass?.description?.slice(0, 30) + '...'}</p>
                <p>price:{singleClass?.price}</p>
                <p>Available seats:{singleClass?.seats}</p>
                <div className="card-actions">
                    <label disabled={userData?.role == 'admin' ? true : userData?.role == 'instructor' ? true : singleClass.seats == '0' ? true : userData?.payments?.find(payment => payment?.Class?._id == singleClass?._id) ? true : false} className={`btn btn-primary $ `} htmlFor={singleClass?._id} className="btn btn-warning">{userData?.payments?.find(payment => payment.Class?._id == singleClass._id) ? 'Already Enrolled' : 'Enroll Now'}</label>

                    {/* Put this part before </body> tag */}
                    <input type="checkbox" id={singleClass._id} className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <Elements stripe={stripePromise}>
                                <CheckoutForm price={singleClass.price}
                                    singleClass={singleClass} />
                            </Elements>
                            <div className="modal-action">
                                <label htmlFor={singleClass._id} className="btn">Close!</label>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => deleteCLass(userData.addedClasses, singleClass, Userdata)} className="btn btn-ghost">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default StudentClassesCard;