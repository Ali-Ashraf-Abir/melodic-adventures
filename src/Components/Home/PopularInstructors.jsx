import React, { useEffect, useState } from 'react';
import PopularInstructorCards from './PopularClassesCards';



const PopularInstructors = () => {
    const [data, setData] = useState()


    useEffect(() => {

        fetch('https://melodic-adventure-server-ali-ashraf-abir.vercel.app/getinstructors')
            .then(res => res.json())
            .then(result => {
                setData(result)
            })




    }, [])
    console.log(data)
    return (
        <div>
            <div className="text-3xl font-bold border-b-4 border-primary text-center font-nunito py-6 gap-5"><h1>Our Instructors</h1></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 lg:w-[900px] mx-auto w-[full] gap-6 mt-6">
                {
                    data?.slice(0,6).map(instructor => <PopularInstructorCards


                        instructor={instructor}

                    ></PopularInstructorCards>)
                }

            </div>
            {
                data?.length>6?<div className='text-center mt-6'><Link to='/instructors'><button className='btn btn-warning'>See More</button></Link></div>:''
            }
        </div>
    );
};

export default PopularInstructors;