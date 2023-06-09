import React, { useEffect, useState } from 'react';

const PopularInstructors = () => {
    const [data, setData] = useState()


    useEffect(() => {

        fetch('http://localhost:5000/getinstructors')
            .then(res => res.json())
            .then(result => {
                setData(result)
            })




    }, [])
    console.log(data)
    return (
        <div>
            <div className="text-3xl font-bold border-b-4 border-primary text-center font-nunito py-6 gap-5"><h1>Our Instructors</h1></div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                {
                    data?.map(instructor => <InstructorCard


                        instructor={instructor}

                    ></InstructorCard>)
                }
            </div>
        </div>
    );
};

export default PopularInstructors;