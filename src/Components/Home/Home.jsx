import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer';
import Navbar from '../Shared/Navbar';

const Home = () => {
    window.scroll(0,0)
    return (
        <div >
        <Navbar></Navbar>
        <div className="min-h-[60vh]"><Outlet></Outlet></div>
        <Footer></Footer>
        
        
        </div>

    );
};

export default Home;