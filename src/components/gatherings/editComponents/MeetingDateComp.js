import React from 'react';
import PropTypes from 'prop-types';

const MeetingDateComp = ({ theDate, handleChange }) => (
    <div>
        <h4>Meeting Date</h4>
        <input
            className='mDate'
            type='date'
            id='meetingDate'
            name='meetingDate'
            value={theDate}
            onChange={(e) => handleChange(e)}
        />
    </div>
);
MeetingDateComp.propTypes = {
    theDate: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default MeetingDateComp;
