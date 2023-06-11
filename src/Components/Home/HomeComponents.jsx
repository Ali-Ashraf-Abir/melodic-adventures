import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import ContactUs from '../ContactUs';
import Banner from './Banner';
import PopularClass from './PopularClass';
import PopularInstructors from './PopularInstructors';

const HomeComponents = () => {
    return (
        <div>
            <Fade><Banner></Banner></Fade>
           <Fade><PopularClass></PopularClass></Fade>
            <Fade><PopularInstructors></PopularInstructors></Fade>
            <Slide><ContactUs></ContactUs></Slide>
        </div>
    );
};

export default HomeComponents;