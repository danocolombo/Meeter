import React from 'react';

import './meeting-people.styles.scss';

const MeetingPeople = ({ label, ...otherProps }) => (
    <div className='mtg-people'>
        <div className='mtg-people-title'>{label}</div>
        <select className='mtg-people-select' {...otherProps}>
            <option value='Bubba'>Bubba</option>
            <option value='Dano'>Dano</option>
            <option value='Joe'>Joe</option>
            <option value='Joni'>Joni</option>
            <option value='Lenora'>Lenora</option>
        </select>
    </div>
);
export default MeetingPeople;
