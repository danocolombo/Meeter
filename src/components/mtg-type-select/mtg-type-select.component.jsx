import React from 'react';

import './mtg-type-select.styles.scss';

const MeetingTypeSelect = ({ ...otherProps }) => (
    <div className='group'>
        <select className='mtg-type-select' {...otherProps}>
            <option value='Testimony'>Testimony</option>
            <option value='Lesson'>Lesson</option>
            <option value='Special'>Special</option>
            <option value='Training'>Training</option>
            <option value='other'>Other</option>
        </select>
    </div>
);
export default MeetingTypeSelect;
