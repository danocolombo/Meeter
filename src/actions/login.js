import axios from 'axios';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE,
    SET_ACTIVES,
    SET_AUTH_ACTIVES,
    SET_MTG_CONFIGS,
    SET_DEFAULT_GROUPS,
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
            let login_success_data = {
                token: data.token,
            };
            //pass the jwt to LOGIN_SUCCESS
            dispatch({
                type: LOGIN_SUCCESS,
                payload: login_success_data,
            });
            //======================================
            // now lets get our user information
            // from Cognito, send to loadUser
            let uData = {
                _id: data.idToken.payload.sub,
                email: data.idToken.payload.email,
                firstName: data.idToken.payload.given_name,
                lastName: data.idToken.payload.family_name,
                phone: data.idToken.payload.phone_number,
            };

            dispatch(loadUser({ uData }));
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

// Load System
//---------------------------------------------------------
// we want to load meeter mtgConfigs and defaultMeetings
//---------------------------------------------------------
export const loadSystem = (cid) => async (dispatch) => {
    try {
        let client = cid.theClient;
        //----------------------------------
        // get client meeting configs
        //----------------------------------
        const config = {
            headers: {
                'Access-Control-Allow-Headers':
                    'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                'Content-Type': 'application/json',
            },
        };

        let obj1 = {
            operation: 'getConfigs',
            payload: {
                clientId: client,
            },
        };
        let body = JSON.stringify(obj1);

        let api2use = process.env.REACT_APP_MEETER_API + '/clients';
        let res = null;
        try {
            res = await axios.post(api2use, body, config).catch((err) => {
                if (err.response.status === 404) {
                    throw new Error(`${err.config.url} not found`);
                }
                throw err;
            });
        } catch (err) {
            console.log('logoin.js - loadSystem: getConfigs failed');
        }
        if (res.status === 200) {
            dispatch({
                type: SET_MTG_CONFIGS,
                payload: res.data.body,
            });
        } else {
            console.log('NO CLIENT MEETING CONFIGS');
        }
        let obj2 = {
            operation: 'getDefaultGroups',
            payload: {
                clientId: client,
            },
        };
        body = JSON.stringify(obj2);

        api2use = process.env.REACT_APP_MEETER_API + '/clients';
        res = null;
        try {
            res = await axios.post(api2use, body, config).catch((err) => {
                if (err.response.status === 404) {
                    throw new Error(`${err.config.url} not found`);
                }
                throw err;
            });
        } catch (err) {
            console.log('logoin.js - loadSystem: getDefaultGroups failed');
        }

        if (res.status === 200) {
            dispatch({
                type: SET_DEFAULT_GROUPS,
                payload: res.data.body,
            });
        }
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};
// Load User
export const loadUser = (userId) => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const config = {
            headers: {
                'Access-Control-Allow-Headers':
                    'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                'Content-Type': 'application/json',
            },
        };
        // take the _id value and get user from meeter API
        let sub = userId.uData._id;
        let obj = { operation: 'authenticate', payload: { uid: sub } };
        const body = JSON.stringify(obj);

        const api2use = process.env.REACT_APP_MEETER_API + '/user';
        const res = await axios.post(api2use, body, config);
        // now add response data location: res.data.body.x values
        // to the values already passed in from login (cognito)
        let user_data = {
            _id: userId.uData._id,
            firstName: userId.uData.firstName,
            lastName: userId.uData.lastName,
            email: userId.uData.email,
            phone: userId.uData.phone,
            defaultClient: res.data.body.defaultClient,
            defaultClientRole: res.data.body.role,
            defaultClientStatus: res.data.body.status,
            // activeClient: res.data.body.defaultClient,
            // activeRole: res.data.body.role,
            // activeStatus: res.data.body.status,
        };
        let active_data = {
            client: res.data.body.defaultClient,
            role: res.data.body.role,
            status: res.data.body.status,
        };
        dispatch({
            type: SET_ACTIVES,
            payload: active_data,
        });
        dispatch({
            type: USER_LOADED,
            payload: user_data,
        });
        // now set the active client, role and status from default vales
        let active_values = {
            activeClient: userId.uData.defaultClient,
            activeRole: userId.uData.defaultClientRole,
            activeStatus: userId.uData.defaultClientStatus,
        };
        dispatch({
            type: SET_AUTH_ACTIVES,
            payload: active_values,
        });
        let theClient = res.data.body.defaultClient;
        dispatch(loadSystem({ theClient }));
    } catch (err) {
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
