import React, { useState } from 'react';

import PropTypes from 'prop-types';

import '../gathering.styles.scss';
const EventType = ({ eventType, onTypeChange }) => {
    const handleTypeChange = (updatedSetting) => {
        onTypeChange(updatedSetting);
    };
    return (
        <div className='form-group'>
            <h4>Meeting Type **</h4>
            <select
                key='2'
                name='meetingType'
                value={eventType}
                onChange={(e) => handleTypeChange(e)}
            >
                <option key='0' value='0'>
                    ** Select the type of meeting
                </option>
                <option key='1' value='Lesson'>
                    Lesson
                </option>
                <option key='2' value='Testimony'>
                    Testimony
                </option>
                <option key='3' value='Special'>
                    Special
                </option>
                <option key='4' value='Teaching'>
                    Teaching
                </option>
                <option key='5' value='Other'>
                    Other
                </option>
            </select>
            <small className='form-text'>What kind of meeting is this?</small>
        </div>
    );
};
EventType.propTypes = {
    eventType: PropTypes.string.isRequired,
    onTypeChange: PropTypes.func.isRequired,
};
export default EventType;
