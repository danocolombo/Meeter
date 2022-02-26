import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import '../gathering.styles.scss';
const Donations = ({ donation, onDonationChange, config }) => {
    useEffect(() => {
        console.log('config:', config.setting);
    }, [config]);

    const handleDonationChange = (updatedSetting) => {
        onDonationChange(updatedSetting);
    };
    return config.setting ? (
        <div>NO DONATIONS</div>
    ) : (
        <div className='form-group'>
            <h4>Donations</h4>
            <input
                type='number'
                id='donations'
                name='donations'
                value={donation}
                min='0.00'
                step='0.01'
                max='500'
                onChange={(e) => handleDonationChange(e)}
            />
            <small className='form-text'>Amount of donations received?</small>
        </div>
    );
};
Donations.propTypes = {
    donation: PropTypes.number.isRequired,
    onDonationChange: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
};
export default Donations;
