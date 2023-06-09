import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PopularClass = () => {

    const [data, setData] = useState()
    useEffect(() => {

        fetch('http://localhost:5000/popularclasses')
            .then(res => res.json())
            .then(data => {
                setData(data)
            })

    }, [])



    return (
        <div>
            <div className="font-nunito text-3xl font-bold text-center mt-6 border-b-4 border-primary"><p>Popular Classes</p></div>
                <div className="grid lg:grid-cols-2 grid-cols-1  gap-6 lg:w-[900px] mt-[20px] w-full mx-auto">
                {
                data?.slice(0, 6).map(Class =><div className="card w-96 bg-base-100 shadow-xl image-full">
                    <figure><img src={Class.img} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{Class.name}</h2>
                        <p>{Class.description.slice(0,100)+'....'}</p>
                        <div className="card-actions justify-end ">
                            <button className="btn btn-primary ">Add to list</button>
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