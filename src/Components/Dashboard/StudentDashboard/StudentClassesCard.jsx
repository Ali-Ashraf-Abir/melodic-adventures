import React from 'react';

const StudentClassesCard = ({singleClass}) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={singleClass.img} alt="Shoes" className="rounded-xl w-[300px] h-[200px]" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{singleClass.name}</h2>
                <p>{singleClass.description.slice(0,30)+'...'}</p>
                <p>price:{singleClass.price}</p>
                <p>Available seats:{singleClass.seats}</p>
                <div className="card-actions">
                    <button className="btn btn-primary">Enroll Now!</button>
                </div>
            </div>
        </div>
    );
};

export default StudentClassesCard;