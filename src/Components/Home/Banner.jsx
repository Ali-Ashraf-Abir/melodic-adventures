import React from 'react';
import './Banner.css'
const Banner = () => {
    return (
        <div>
            <div className="hero min-h-screen banner font-nunito">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content ">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold ">Welcome To Your Melodical Journey</h1>
                        <p className="mb-5">A place to learn and enhance your musical and instrumental skills to the next point with our summer camp programs</p>
                        <button className="btn btn-warning">Join Now!</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;