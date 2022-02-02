import React, { Fragment } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { dispatchThis } from '../../actions/dispatchMessage';
import PropTypes from 'prop-types';
// import {} from '../../actions/auth';

const ConfirmUser = ({ dispatchThis }) => {
    const thisVersion = process.env.REACT_APP_MEETER_VERSION;
    const handleChange = (e) => {
        alert('yep');
        dispatchThis('test', 'green');
    };
    const handleGreenButton = (e) => {
        dispatchThis('GREEN', 'green');
    };
    const handleRedButton = (e) => {
        dispatchThis('RED', 'red');
    };
    return (
        <Fragment>
            <h1 className='large text-primary'>Confirm Account</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Confirm Your Account
            </p>
            <button onClick={() => handleChange()}>Button 1</button>
            <button onClick={() => handleGreenButton()}>GREEN</button>
            <button onClick={() => handleRedButton()}>RED</button>

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

ConfirmUser.propTypes = {
    dispatchThis: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { dispatchThis })(ConfirmUser);
