import React, { Fragment, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { processLogin } from '../../actions/auth';

import crypto from 'crypto';

const Login = ({ login, isAuthenticated, processLogin }) => {
    const thisVersion = process.env.REACT_APP_MEETER_VERSION;
    const history = useHistory();
    const [userIsRegistered, setUserIsRegistered] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   

    const signIn = async (dispatch) => {
        //   ++++++++++++++++++++++++++++++++++++
        //   SIGN IN
        //   ++++++++++++++++++++++++++++++++++++
        let meeterUser = {};
        let alertPayload = {};
        try {
            await Auth.signIn(username, password)
                .then((user) => {
                    // ----------------------------
                    // at this point we should have cognito user pool details
                    // username, email, given_name, family_name and gender. We
                    // may have others so save waht we get.
                    //=============================
                    meeterUser.id = user?.attributes?.sub;
                    meeterUser.firstName = user?.attributes?.given_name;
                    meeterUser.lastName = user?.attributes?.family_name;
                    meeterUser.gender = user?.attributes?.gender;
                    meeterUser.email = user?.attributes?.email;
                    meeterUser.username = user?.username;
                    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                        // const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'given_name','family_name', 'gender']
                        // this.router.navigateByUrl('/');
                        Auth.completeNewPassword(
                            username, // the Cognito User Object
                            password,
                            // the new password
                            // OPTIONAL, the required attributes
                            {
                                email: username,
                                phone_number: '+12345678901',
                                gender: 'm',
                                first_name: 'john',
                                last_name: 'doe',
                            }
                        )
                            .then((user) => {
                                // at this time the user is logged in if no MFA required
                                console.log('authenticated: ', user);
                            })
                            .catch((e) => {
                                const alertPayload = {
                                    msg: 'Authentication failed. Please check your credentials',
                                    alertType: 'danger',
                                };
                                setAlert(alertPayload);
                                return;
                            });
                    }
                    //user is good to proceed
                })
                .catch((e) => {
                    switch (e.code) {
                        case 'UserNotFoundException':
                            alertPayload = {
                                msg: e.message,
                                alertType: 'danger',
                            };
                            break;
                        case 'PasswordResetRequiredException':
                            alertPayload = {
                                msg: e.message,
                                alertType: 'danger',
                            };
                            break;
                        case 'NotAuthorizedException':
                            alertPayload = {
                                msg: e.message,
                                alertType: 'danger',
                            };
                        default:
                            alertPayload = {
                                msg: 'Signin error: [' + e.message + ']',
                                alertType: 'danger',
                            };
                            break;
                    }
                    setAlert(alertPayload);
                    return;
                });
            //--------------------------------
            // user is authenticated
            //--------------------------------
            let currentUserInfo = {};
            let currentSession = {};
            setUserIsRegistered(true);

            // get User Info
            await Auth.currentUserInfo().then((u) => {
                currentUserInfo = u;
            });

            // get Session info
            await Auth.currentSession().then((data) => {
                currentSession = data;
            });
            meeterUser.token = currentSession?.accessToken?.jwtToken;
            //   GO TO DASHBOARD



            await processLogin(meeterUser);
            // we will get true if user is registered or false if not
            //TODO ++++++++++++++++++++++++++++++++++++++
            //TODO--- NEED TO HAVE FUNCTION TO saveUser
            alert('processLogin call returned ');
            //TODO ++++++++++++++++++++++++++++++++++++++
            // const userIsRegistered = await saveUser(
            //     currentUserInfo,
            //     currentSession
            // );
            //TODO ++++++++++++++++++++++++++++++++++++++
            //TODO--- NEED TO HAVE FUNCTION TO getRegistrations
            alert('getRegistration call ');
            //TODO ++++++++++++++++++++++++++++++++++++++
            //await getRegistrations(currentUserInfo.attributes.sub);

            //let user know if they need to complete registration
            console.log('REGISTERED: ' + userIsRegistered);
            !userIsRegistered ? console.log('NOPE') : console.log('YEP');

            //TODO +++++++++++++++++++++++++
            //TODO turn spinner off
            //TODO +++++++++++++++++++++++++
            //clearSpinner();
            userIsRegistered ? history.push('/') : history.push('/profile');
        } catch (error) {
            switch (error) {
                case 'No current user':
                    alertPayload = {
                        msg: 'Authentication failed. Please check your credentials',
                        alertType: 'danger',
                    };
                    break;

                default:
                    alertPayload = {
                        msg: 'Unknown error signing in.[' + error + ']',
                        alertType: 'danger',
                    };
                    break;
            }

            setAlert(alertPayload);
            //TODO +++++++++++++++++++++++++
            //TODO turn spinner off
            //TODO +++++++++++++++++++++++++
            //clearSpinner();clearSpinner();
        }
    };

    if (isAuthenticated) {
        //-----------------------------------------------------
        // if the user is authenticated, redirect to dashboard
        // otherwise stay on login page, error if necessary
        //-----------------------------------------------------
        return <Redirect to='/dashboard' />;
    }

    return (
        <Fragment>
            <h1 className='large text-primary'>Sign In</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Sign Into Your Account
            </p>
            <div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Email Address'
                        name='userName'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength='6'
                    />
                </div>
                <input
                    type='button'
                    onClick={signIn}
                    className='btn btn-primary'
                    value='Login'
                />
            </div>
            <p className='my-1'>
                Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
            <div className='appVersion'>build: {thisVersion}</div>
        </Fragment>
    );
};

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    processLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
    processLogin,
})(Login);
