import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const PaymentHistory = () => {


    const { user, loading } = useContext(AuthContext)
    const [ data, setData ] = useState()

    useEffect(() => {

        if (user && !loading) {
            fetch(`https://melodic-adventure-server-ali-ashraf-abir.vercel.app/currentuser/${user.email.toLowerCase()}`)
                .then(res => res.json())
                .then(result => {

                    setData(result[0])
                })
        }

    }, [loading])



    return (
        <div>
             <div className="font-nunito text-3xl font-bold text-center"><p>Payment History</p></div>

         
          
            {
                data?.payments?<div className="overflow-x-auto mt-6">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Class Name</th>
                            <th>Instructor Mail</th>
                            <th>Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>
                      
                        {/* row 1 */}
                        {
                  data?.payments?.map((payment,index) => <tr className="bg-base-200">
                        <th>{index+1}</th>
                        <td>{payment.Class.name}</td>
                        <td>{payment.Class.email}</td>
                        <td>{payment.transactionID}</td>
                    </tr>)
                }

                    </tbody>
                </table>
            </div>: <div className="text-xl mt-6 text-center"><h1>No transactions found</h1></div>
     
            }
        </div>
    );
};

export default PaymentHistory;