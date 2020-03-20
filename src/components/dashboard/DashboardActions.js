import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
    return (
        <div className='dash-buttons'>
            <Link to='/edit-profile' className='btn meeterNavTextHighlight'>
                <i className='fas fa-user-circle text-primary' /> Edit Profile
            </Link>
            <Link to='/add-experience' className='btn meeterNavTextHighlight'>
                <i className='fab fa-black-tie text-primary' /> Add Experience
            </Link>
            <Link to='/add-education' className='btn meeterNavTextHighlight'>
                <i className='fas fa-graduation-cap text-primary' /> Add
                Education
            </Link>
        </div>
    );
};
//meeterNavTextHighlight  replaced className on Links btn btn-light
export default DashboardActions;
