import React from 'react';

import './meeting-objective.styles.scss';

const MeetingObjective = ({ typeName, typeLabel, typeValue, onChange }) => (
    <>
        <div className='group'>
            <select className='mtg-type-select' name={typeName}>
                <option typeValue='Testimony'>Testimony</option>
                <option typeValue='Lesson'>Lesson</option>
                <option typeValue='Special'>Special</option>
                <option typeValue='Training'>Training</option>
                <option typeValue='other'>Other</option>
            </select>
        </div>
        <div>
            {typeValue === 'Lesson' ? (
                <div className='lesson-box'>LESSON</div>
            ) : null}
        </div>
    </>
);
export default MeetingObjective;
