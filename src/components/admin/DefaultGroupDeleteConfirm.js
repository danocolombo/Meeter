import React, { useState } from 'react';
// import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const ConfirmGroupDelete = ({
    genderValue,
    titleValue,
    locationValue,
    facilitatorValue,
    confirmDeleteResonse,
}) => {
    const handleDeleteConfirm = () => {
        confirmDeleteResonse('DELETE');
    };

    const handleDeleteCancel = () => {
        confirmDeleteResonse('CANCEL');
    };
    return (
        <>
            <h3>Confirm Delete</h3>
            <p>You want to delete this default group?</p>
            <div style={{ 'padding-left': 50 }}>
                {genderValue === 'f' && <div>Women's</div>}
                {genderValue === 'm' && <div>Men's</div>}
                {genderValue === 'x' && <div></div>}
            </div>
            <p style={{ 'padding-left': 50 }}>{titleValue}</p>
            {locationValue && (
                <p style={{ 'padding-left': 50 }}>{locationValue}</p>
            )}
            {facilitatorValue && (
                <p style={{ 'padding-left': 50 }}>{facilitatorValue}</p>
            )}
            <br />
            {/* <Button className='btn btn-primary my-1' onClick={handleConfirm}>
                CONFIRM
            </Button>
            <Button onClick={handleCancel}>CANCEL</Button>
 */}

            <p>Please confirm</p>
            <div>
                <i
                    className={'fas fa-check pl-2 my'}
                    onClick={handleDeleteConfirm}
                ></i>
                <i
                    className={'pl-2 fa fa-ban my'}
                    onClick={handleDeleteCancel}
                ></i>
            </div>
        </>
    );
};
ConfirmGroupDelete.propTypes = {
    genderValue: PropTypes.string.isRequired,
    titleValue: PropTypes.string.isRequired,
    locationValue: PropTypes.string.isRequired,
    facilitatorValue: PropTypes.string.isRequired,
    confirmDeleteResonse: PropTypes.func.isRequired,
};
export default ConfirmGroupDelete;
