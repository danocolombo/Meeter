import axios from 'axios';
// import {
//     CognitoUser,
//     AuthenticationDetails,
//     CognitoUserPool,
// } from "amazon-cognito-identity-js";
// import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { setAlert } from './alert';
import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE,
    SET_ACTIVES,
    SET_MTG_CONFIGS,
    SET_DEFAULT_GROUPS,
    SET_CLIENT_USERS,
    SET_CLIENT,
} from './types';

import crypto from 'crypto';
import UserPool from './UserPool';
import { Auth } from 'aws-amplify';

export const dispatchAuth = (jwtToken) => async (dispatch) => {
    //dispatch to save
    console.log('check this token out:\n', jwtToken);
    let login_success_data = {
        token: jwtToken,
    };
    //pass the jwt to LOGIN_SUCCESS
    //save token in redux
    dispatch({
        type: LOGIN_SUCCESS,
        payload: login_success_data,
    });
};

//================================
// get user info from Dynamo
//================================
export const getUserDBInfo = (meeterUserId) => async (dispatch) => {
    // get Meeter Info for user
    try {
        const config = {
            headers: {
                'Access-Control-Allow-Headers':
                    'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                'Content-Type': 'application/json',
            },
        };
        // take the _id value and get user from meeter API

        let obj = { operation: 'authenticate', payload: { uid: meeterUserId } };
        const body = JSON.stringify(obj);

        const api2use = process.env.REACT_APP_MEETER_API + '/user';
        const res = await axios.post(api2use, body, config);
        return res.data;
    } catch (err) {
        let errorResponse = {
            body: {
                message: 'no user info in meeter database',
                error: err,
            },
            status: '400',
        };
        return errorResponse;
    }
};

//   ===================================
//   save the active info to REDUX
//   ===================================
export const dispatchActives = (activeInfo) => async (dispatch) => {
    // this next dispatch does nothing...??
    dispatch({
        type: SET_ACTIVES,
        payload: activeInfo,
    });
};

//   ===================================
//   save the user info to REDUX
//   ===================================
export const dispatchUserInfo = (userInfo) => async (dispatch) => {
    // now add response data location: res.data.body.x values
    // to the values already passed in from login (cognito)

    dispatch({
        type: USER_LOADED,
        payload: userInfo,
    });
};
//================================
// get client info from Dynamo
//================================
export const getClientDBInfo = (clientId) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Access-Control-Allow-Headers':
                    'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                'Content-Type': 'application/json',
            },
        };
        // take the _id value and get user from meeter API

        let obj = {
            operation: 'getClient',
            payload: { clientId: clientId },
        };
        const body = JSON.stringify(obj);

        const api2use = process.env.REACT_APP_MEETER_API + '/clients';
        const res = await axios.post(api2use, body, config);
        return res.data;
    } catch (err) {
        let errorResponse = {
            body: {
                message: 'no client info in meeter database',
                error: err,
            },
            status: '400',
        };
        return errorResponse;
    }
};
//   ===================================
//   save the client info to REDUX
//   ===================================
export const dispatchClientInfo = (clientInfo) => async (dispatch) => {
    dispatch({
        type: SET_CLIENT,
        payload: clientInfo,
    });
};

//   ===================================
//   save the client info to REDUX
//   ===================================
export const dispatchGroupInfo = (groupInfo) => async (dispatch) => {
    if (Object.keys(groupInfo).length > 0) {
        let gInfo = groupInfo?.Items[0];
        //confirm we have defaultGroups and save
        if (gInfo.hasOwnProperty('defaultGroups')) {
            dispatch({
                type: SET_DEFAULT_GROUPS,
                payload: gInfo.defaultGroups,
            });
        }
    }
};

//   ===================================
//   save the Meeting Configs to REDUX
//   ===================================
export const dispatchMeetingConfigs = (meeetingConfigs) => async (dispatch) => {
    if (Object.keys(meeetingConfigs).length > 0) {
        let mInfo = meeetingConfigs?.Items[0];
        //confirm we have defaultGroups and save
        if (mInfo.hasOwnProperty('defaultGroups')) {
            dispatch({
                type: SET_MTG_CONFIGS,
                payload: mInfo.clientConfigs,
            });
        }
    }
};
//   ===================================
//   save the Meeting Configs to REDUX
//   ===================================
export const dispatchClientUsers = (clientInfo) => async (dispatch) => {
    dispatch({
        type: SET_CLIENT_USERS,
        payload: clientInfo.clientUsers,
    });
};
