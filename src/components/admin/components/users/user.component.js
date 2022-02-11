import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import './user-component.styles.scss';
const UserComponent = ({
    user: { _id, firstName, lastName, role, status },
}) => {
    return (
        <>
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
                            >
                                <option value='owner'>Owner</option>
                                <option value='leader'>Leader</option>
                                <option value='servant'>Servant</option>
                                <option value='undefined'> - </option>
                            </select>
                            <label
                                className='user-component__role-label'
                                for='role'
                            >
                                Role:
                            </label>
                        </div>
                        <div className='user-component__status-wrapper'>
                            <select
                                className='user-component__status-control'
                                name='status'
                                id='status'
                            >
                                <option value='active'>Active</option>
                                <option value='Suspend'>Suspend</option>
                            </select>
                            <label
                                className='user-component__status-label'
                                for='status'
                            >
                                Status:
                            </label>
                        </div>
                        <div className='user-component__button-wrapper'>
                            <Button className='user-component__button-control'>
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
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
