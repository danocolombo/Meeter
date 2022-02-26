import React, { useState } from 'react';

import PropTypes from 'prop-types';

import '../gathering.styles.scss';
const EventDate = ({ meetingDate, onDateChange }) => {
    // const handleUpdateRequest = (updatedSetting) => {
    //     onConfigUpdate(updatedSetting);
    // };
    return (
        <div>
            <h4>Meeting Date **</h4>
            <input
                className='mDate'
                type='date'
                id='meetingDate'
                name='meetingDate'
                value={meetingDate.slice(0, 10)}
                onChange={(e) => onDateChange(e)}
            />
        </div>
    );
};
EventDate.propTypes = {
    meetingDate: PropTypes.string.isRequired,
    onDateChange: PropTypes.func.isRequired,
};
export default EventDate;
