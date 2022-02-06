import React, { Fragment, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import {
    dispatchAuth,
    getUserDBInfo,
    dispatchActives,
    dispatchUserInfo,
    getClientDBInfo,
    dispatchClientInfo,
} from '../../actions/auth';

const Login = ({
    isAuthenticated,
    getUserDBInfo,
    dispatchAuth,
    dispatchActives,
    dispatchUserInfo,
    getClientDBInfo,
    dispatchClientInfo,
}) => {
    const thisVersion = process.env.REACT_APP_MEETER_VERSION;
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async (dispatch) => {
        //   ++++++++++++++++++++++++++++++++++++
        //   SIGN IN
        //   ++++++++++++++++++++++++++++++++++++
        let meeterUser = {};
        let alertPayload = {};
        // make the login username lowercase
        const usernameToUse = String(username).toLowerCase();

        try {
            await Auth.signIn(usernameToUse, password)
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
                    return async function () {
                        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                            // const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'given_name','family_name', 'gender']
                            // this.router.navigateByUrl('/');
                            return async function () {
                                return Auth.completeNewPassword(
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
                            };
                        }
                    };
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
                            break;
                        default:
                            alertPayload = {
                                msg: 'Signin error: [' + e.message + ']',
                                alertType: 'danger',
                            };
                            break;
                    }
                    return;
                });
            //   --------------------------------
            //   HANDLE USER
            //   --------------------------------

            // get Session info (token)
            let currentSessionInfo = null;
            await Auth.currentSession().then((data) => {
                currentSessionInfo = data;
            });
            if (currentSessionInfo?.idToken?.jwtToken) {
                meeterUser.jwtToken = currentSessionInfo.idToken.jwtToken;
            } else {
                //   NEED TO THROW ERROR, WE DON'T HAVE SESSION
                //TODO ---> need to handle no session
                alert('NO SESSION');
                return;
            }

            //   DISPATCH AUTH TOKEN
            await dispatchAuth(meeterUser.jwtToken);

            //   getUser from DDB
            let userDBInfo = await getUserDBInfo(meeterUser.id);
            // if we have user info, save it, otherwise
            // error and stop
            if (userDBInfo?.status === '200') {
                meeterUser.meeterId = userDBInfo.body._id;
                meeterUser.email = userDBInfo.body.email;
                meeterUser.phone_number = userDBInfo.body.phone;
                meeterUser.clientId = userDBInfo.body.defaultClientId;
                meeterUser.clientCode = userDBInfo.body.defaultClient;
                //todo maybe set default if 'undefined'
                meeterUser.role = userDBInfo.body.role;
                //todo maybe set default if 'undefined'
                meeterUser.status = userDBInfo.body.status;
            } else {
                //=========================
                // no user response from db
                // throw error and prevent
                // going forward.
                //==========================
                alertPayload = {
                    msg: 'Authentication error. No Meeter user info [109609]',
                    alertType: 'danger',
                };
            }
            // DISPATCH ACTIVES
            let activeInfo = {
                client: meeterUser.clientCode,
                clientId: meeterUser.clientId,
                role: meeterUser.role,
                status: meeterUser.status,
            };
            await dispatchActives(activeInfo);
            //   DISPATCH USER INFO
            let userInfo = {
                _id: meeterUser.id,
                username: meeterUser.username,
                firstName: meeterUser.firstName,
                lastName: meeterUser.lastName,
                email: meeterUser.email,
                gender: meeterUser.gender,
                defaultClient: meeterUser.clientCode,
                defaultClientId: meeterUser.clientId,
                defaultClientRole: meeterUser.role,
                defaultClientStatus: meeterUser.status,
            };
            await dispatchUserInfo(userInfo);
            //   getClient from DDB
            let clientRes = await getClientDBInfo(meeterUser.clientCode);
            let clientInfo = {
                clientId: meeterUser.clientId,
                clientName: clientRes?.Items[0]?.clientName,
                clientCode: meeterUser.clientCode,
                defaultGroups: clientRes?.Items[0]?.defaultGroups,
                clientUsers: clientRes?.Items[0]?.users,
                clientConfigs: clientRes?.Items[0]?.clientConfigs,
            };
            //   DISPATCH SET CLIENT
            await dispatchClientInfo(clientInfo);
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
                        placeholder='Username'
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
                <br />
                Need to confirm account?{' '}
                <Link to='/confirmuser'>Click Here</Link>
            </p>

            <div className='appVersion'>build: {thisVersion}</div>
        </Fragment>
    );
};

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    getUserDBInfo: PropTypes.func.isRequired,
    dispatchAuth: PropTypes.func.isRequired,
    dispatchActives: PropTypes.func.isRequired,
    dispatchUserInfo: PropTypes.func.isRequired,
    getClientDBInfo: PropTypes.func.isRequired,
    dispatchClientInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
    dispatchAuth,
    getUserDBInfo,
    dispatchActives,
    dispatchUserInfo,
    getClientDBInfo,
    dispatchClientInfo,
})(Login);
