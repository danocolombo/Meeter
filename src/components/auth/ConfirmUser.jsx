import React, { Fragment, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import {} from '../../actions/auth';

const ConfirmUser = () => {
    const thisVersion = process.env.REACT_APP_MEETER_VERSION;

    return (
        <Fragment>
            <h1 className='large text-primary'>Confirm Account</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Confirm Your Account
            </p>

            <p className='my-1'>
                Already have a confirmed account?{' '}
                <Link to='/login'>Click Here</Link>
                <br />
                Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
            <div className='appVersion'>build: {thisVersion}</div>
        </Fragment>
    );
};

ConfirmUser.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(ConfirmUser);
