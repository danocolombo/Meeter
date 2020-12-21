import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const UserConfirm = ({ userName, handleAction }) => {
    // const { user, key } = props;
    const [role, setRole] = useState('');
    // const getValue = () => {
    //     return this.state.role;
    // };
    const handleSelectChange = (e) => {
        setRole(e.target.value);
    };
    const handleRoleSet = (e) => {
        if (role) {
            handleAction(role);
        }
    };
    const handleRoleCancel = () => {
        const cancelValue = 'CANCEL';
        setRole('');
        handleAction(cancelValue);
    };
    return (
        <>
            <p>Please confirm your appoval for</p>
            <p style={{ 'padding-left': 50 }}>
                <strong>{userName}</strong>
            </p>
            <br />
            <p>Select a role for {userName}</p>
            <form>
                <select value={role} onChange={handleSelectChange}>
                    <option value=''></option>
                    <option value='owner'>Owner</option>
                    <option value='manager'>Manager</option>
                    <option value='guest'>User</option>
                </select>
                {/* <Button onClick={props.handleAction}>SET</Button> */}
                <Button onClick={handleRoleSet}>SET</Button>
                <Button onClick={handleRoleCancel}>CANCEL</Button>
            </form>
        </>
    );
};
UserConfirm.propTypes = {
    userName: PropTypes.string.isRequired,
    handleAction: PropTypes.func.isRequired,
};
export default UserConfirm;
