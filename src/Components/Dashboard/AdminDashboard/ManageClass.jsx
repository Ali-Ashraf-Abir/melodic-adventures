import React, { useEffect, useState } from 'react';
import ManageClassTableRow from './ManageClassTableRow';

const ManageClass = () => {
    

    const [classes,setClasses]=useState()

    const [updated,setUpdated]=useState(false)

    useEffect(()=>{

        fetch('https://melodic-adventure-server-ali-ashraf-abir.vercel.app/allclasses')
        .then(res=>res.json())
        .then(data=>{
                setClasses(data)
        })
        setUpdated(false)

    },[updated])



    return (
        <div>
            <div>

                <div className="text-3xl font-bold text-center"><h1>Manage All Classes</h1></div>
                <div>

                    <div className="overflow-x-auto font-nunito">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                <th className='lg:hidden block'></th>
                                <th className='lg:hidden block'></th>
                                <th className='lg:hidden block'></th>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Instructor Email</th>
                                    <th>Status</th>
                                    <th></th>
                                    <th></th>

                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {classes?.map(singleClass => <ManageClassTableRow

                                    key={singleClass._id}
                                    singleClass={singleClass}
                                    setUpdated={setUpdated}
                                ></ManageClassTableRow>)}
                            </tbody>
                            {/* foot */}
                            <tfoot>
                                <tr>
                                <th className='lg:hidden block'></th>
                                <th className='lg:hidden block'></th>
                                <th className='lg:hidden block'></th>
                                <th></th>
                                <th>Name</th>
                                    <th>Instructor Email</th>
                                    <th>Status</th>
                                    <th></th>
                                    <th></th>

                                </tr>
                            </tfoot>

                        </table>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ManageClass;