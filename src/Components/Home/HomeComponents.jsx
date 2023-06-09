import React from 'react';
import Banner from './Banner';
import PopularClass from './PopularClass';
import PopularInstructors from './PopularInstructors';

const HomeComponents = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularClass></PopularClass>
            <PopularInstructors></PopularInstructors>
        </div>
    );
};

export default HomeComponents;