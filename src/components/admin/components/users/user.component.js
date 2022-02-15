import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import './user-component.styles.scss';
const UserComponent = ({
    auth: { user },
    user: { userId, firstName, lastName, role, status },
    onUserUpdate,
}) => {
    const [userRole, setUserRole] = useState(role);
    const [userStatus, setUserStatus] = useState(status);
    const userUpdateHandler = (e) => {
        e.preventDefault();
        const userUpdates = {
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            role: userRole,
            status: userStatus,
        };
        onUserUpdate(userUpdates);
    };
    return (
        <>
            <form onSubmit={userUpdateHandler}>
                <div className='user-component__component-wrapper'>
                    <div className='user-component__user-wrapper'>
                        <div className='user-component__user-name'>
                            {firstName} {lastName}
                        </div>
                        <div className='user-component__options'>
                            <div className='user-component__role-wrapper'>
                                <select
                                    className='user-component__role-control'
                                    name='role'
                                    id='role'
                                    value={userRole}
                                    onChange={(e) => {
                                        setUserRole(e.target.value);
                                    }}
                                >
                                    <option value='superuser'>
                                        Super User
                                    </option>
                                    <option value='owner'>Owner</option>
                                    <option value='leader'>Leader</option>
                                    <option value='servant'>Servant</option>
                                    <option value='undefined'> - </option>
                                </select>
                                <label
                                    className='user-component__role-label'
                                    htmlFor='role'
                                >
                                    Role:
                                </label>
                            </div>
                            <div className='user-component__status-wrapper'>
                                <select
                                    className='user-component__status-control'
                                    name='status'
                                    value={userStatus}
                                    id='status'
                                    onChange={(e) => {
                                        setUserStatus(e.target.value);
                                    }}
                                >
                                    <option value='active'>Active</option>
                                    <option value='undefined'>Inactive</option>
                                </select>
                                <label
                                    className='user-component__status-label'
                                    htmlFor='status'
                                >
                                    Status:
                                </label>
                            </div>
                            {userId !== user._id && (
                                <div className='user-component__button-wrapper'>
                                    <Button
                                        variant='outlined'
                                        className='user-component__button-control'
                                        type='submit'
                                    >
                                        Update
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};
UserComponent.propTypes = {
    user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, null)(UserComponent);
