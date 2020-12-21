import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const UserReject = ({ userName, handleAction }) => {
    // const { user, key } = props;
    // const [ role, setRole ] = useState('');
    // const getValue = () => {
    //     return this.state.role;
    // }
    const handleSelectChange = (e) => {
        // this.setRole({role:e.target.value});
        // console.log('role selected: ' + e.target.value);
        // console.log('useState role: ' + role);
        // setRole(e.target.value);
        // console.log('useState role (after setRole): ' + role);
        // this.setRole({role:e.target.value});
    };
    const handleConfirm = (e) => {
        // e.preventDefault();
        // alert('setting permissions!!');
        // console.log('------------');
        // console.log('UserConfirmation :: handleRoleSet');
        // console.log('user: ' + userName);
        // console.log('role:' + role);
        // console.log('------------');
        handleAction('CONFIRM');
    };
    const handleCancel = () => {
        const cancelValue = 'CANCEL';
        handleAction(cancelValue);
    };
    return (
        <>
            <h3>Confirm Rejection</h3>
            <p>You are going to delete the request for</p>
            <p style={{ 'padding-left': 50 }}>
                <strong>{userName}</strong>
            </p>
            <br />
            <p>Please confirm</p>

            <Button className='btn btn-primary my-1' onClick={handleConfirm}>
                CONFIRM
            </Button>
            <Button onClick={handleCancel}>CANCEL</Button>
        </>
    );
};
UserReject.propTypes = {
    userName: PropTypes.string.isRequired,
    handleAction: PropTypes.func.isRequired,
};
export default UserReject;
