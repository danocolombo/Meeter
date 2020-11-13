import axios from 'axios';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE,
    SET_PROFILE,
} from './types';
import setAuthToken from '../utils/setAuthToken';

import UserPool from './UserPool';
// import { CollectionsOutlined, DateRange } from '@material-ui/icons';

// Login (Authenticate)
//============================

export const login = (email, password) => async (dispatch) => {
    const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
    });
    const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
    });
    // try to authenticate....
    user.authenticateUser(authDetails, {
        onSuccess: (data) => {
            const jwToken = data.idToken.jwtToken;
            data.token = jwToken;
            // const util = require('util');
            // console.log(
            //     '@@@@@@@@@@ login @@@@@@@@@@@@\n: ' +
            //         util.inspect(data, {
            //             showHidden: false,
            //             depth: null,
            //         })
            // );
            const authData = { token: jwToken };
            // console.log('\n%%%%%%%%%%%%%%%%%%%%%%%%\n');
            //pass the jwt to LOGIN_SUCCESS
            // used to pass data
            dispatch({
                type: LOGIN_SUCCESS,
                payload: authData,
            });
            //======================================
            //now lets get our user information
            // create user payload
            let uData = {
                _id: 0,
                approved: true,
                date: 'undefined',
                defaultClient: 'undefined',
                email: 'undefined',
                name: 'undefined',
                firstName: 'undefined',
                lastName: 'undefined',
                phone: 'undefined',
            };
            if (data.idToken.payload.sub) uData._id = data.idToken.payload.sub;
            if (data.idToken.payload.given_name)
                uData.firstName = data.idToken.payload.given_name;
            if (data.idToken.payload.family_name)
                uData.lastName = data.idToken.payload.family_name;
            if (
                uData.firstName !== 'undefined' &&
                uData.lastName !== 'undefined'
            ) {
                uData.name = uData.firstName + ' ' + uData.lastName;
            }
            if (data.idToken.payload.email)
                uData.email = data.idToken.payload.email;
            if (data.idToken.payload.phone_number)
                uData.phone = data.idToken.payload.phone_number;
            //---------------------------------
            // lets get the meeter userinfo
            //---------------------------------
            dispatch(loadUser);

            // dispatch({
            //     type: USER_LOADED,
            //     payload: uData,
            // });
        },
        onFailure: (err) => {
            console.error('onFailure:', err);
            const util = require('util');
            console.log(
                'err: ' + util.inspect(err, { showHidden: false, depth: null })
            );

            dispatch(setAlert(err.message, 'danger'));
            dispatch({
                type: LOGIN_FAIL,
            });
        },
        // newPasswordRequired: (data) => {
        //     console.log('newPasswordRequired:', data);
        // },
    });
};

// Load User
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        if (localStorage.token) {
            //new header for AWS call
            const config = {
                heaers: {
                    'Access-Control-Allow-Headers':
                        'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                    'Content-Type': 'application-json',
                },
            };
            let userId = '4090ce40-4d32-474e-8df8-2212e70f5fee';
            let obj = { operation: 'authenticate', payload: { uid: userId } };
            const body = JSON.stringify(obj);
            const res = await axios.post(
                'https://2byneyioe4.execute-api.us-east-1.amazonaws.com/dev/user',
                body,
                config
            );

            const util = require('util');
            console.log(
                '@@@@@@@@@@ loadUser @@@@@@@@@@@@\n: ' +
                    util.inspect(res, {
                        showHidden: false,
                        depth: null,
                    })
            );

            console.log('\n%%%%%%%%%%%%%%%%%%%%%%%%\n');
            const userRole = res.data.status.body.userRole;
            console.log('\nUSER-ROLE: ' + userRole + '\n');
            // was USER_LOADED
            dispatch({
                type: SET_PROFILE,
                payload: res,
            });
        } else {
            // we don't have token
            dispatch({
                type: AUTH_ERROR,
            });
        }
    } catch (err) {
        //this means that we were not able to know who we are. Need to clean store

        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL,
        });
    }
};

// Login User
// export const login = (email, password) => async dispatch => {
//   const config = {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   };

//   const body = JSON.stringify({ email, password });

//   try {
//     const res = await axios.post('/api/auth', body, config);

//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: res.data
//     });

//     dispatch(loadUser());
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
//     }

//     dispatch({
//       type: LOGIN_FAIL
//     });
//   }
// };

// Logout / Clear Profile
export const logout = () => (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
};
