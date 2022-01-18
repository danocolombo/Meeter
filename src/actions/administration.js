import axios from 'axios';
import { setAlert } from './alert';
import { randomBytes, createCipheriv } from 'crypto';
import { ADMIN_ERROR, SET_MTG_CONFIGS } from './types';

//-------------------- MEETING CONFIGURATIONS -----------
export const getMtgConfigs = (cid) => async (dispatch) => {
    //this loads all the default groups for cid
    //into meeter.defaultGroups
    console.log('GETTING MEETING CONFIGS');
    if (!cid) return;
    console.log('NEW ADMINISTRATION.getMtgConfigs(' + cid + ')');

    try {
        const config = {
            headers: {
                'Access-Control-Allow-Headers':
                    'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                'Content-Type': 'application/json',
            },
        };
        let obj = {
            operation: 'getConfigs',
            payload: { clientId: cid },
        };

        let body = JSON.stringify(obj);
        let api2use = process.env.REACT_APP_MEETER_API + '/clients';
        let res = await axios.post(api2use, body, config);

        if (res.status === 200) {
            dispatch(setAlert('client updated', 'success'));
            dispatch({
                type: SET_MTG_CONFIGS,
                payload: res.data.body,
            });
        } else {
            dispatch(setAlert('could not get configs', 'danger'));
        }
    } catch (err) {
        console.log('actions/admin.js getMtgConfigs ADMIN_ERROR');
        dispatch({
            type: ADMIN_ERROR,
            payload: {
                msg: err.response.statusText ? err.response.statusText : '',
                status: err.response.status,
            },
        });
    }
};
export const toggleConfig = (config, value, client) => async (dispatch) => {
    // pass the updateMeeterConfigs to /client API operation
    // clientId, config, setting
    //------------------------------------------------------
    let theChange = {};
    theChange.clientId = client.clientId;
    theChange.config = config;
    // NOTE: maintenance will need to pass the clientId, not clientCode
    if (value) {
        theChange.value = 'true';
    } else {
        theChange.value = 'false';
    }
    try {
        const config = {
            headers: {
                'Access-Control-Allow-Headers':
                    'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                'Content-Type': 'application/json',
            },
        };
        let obj = {
            operation: 'updateMeetingConfig',
            payload: theChange,
        };

        let body = JSON.stringify(obj);
        let api2use = process.env.REACT_APP_MEETER_API + '/clients';
        let res = await axios.post(api2use, body, config);

        if (res.status === 200) {
            dispatch(setAlert('client updated', 'success'));
        }
    } catch (err) {
        dispatch({
            type: ADMIN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
export const updateMeetingConfigs = (
    formData,
    history,
    cid,
    edit = false
) => {};

//-------------------- CLIENT INFO ----------------------
export const getClientInfo = (cid) => async (dispatch) => {};
export const getClientUsers = (client) => async (dispatch) => {};

//-------------------- GROUPS ----------------------------
export const getDefGroups = (cid) => async (dispatch) => {};
export const updateDefaultGroup = (revised) => async (dispatch) => {};
export const deleteDefGroup = (groupId, clientInfo) => async (dispatch) => {};
export const addDefaultGroup = (request, clientId) => async (dispatch) => {};

//--------------- USERS & REGISTRATION -------------------
export const grantUserRegistration =
    (cid, id, role, email) => async (dispatch) => {};
export const rejectUserRegistration =
    (cid, id, email) => async (dispatch) => {};
export const deleteClientUser = (cid, uid) => async (dispatch) => {};
export const approveClientUser = (id) => async (dispatch) => {};
export const suspendClientUser = (id) => async (dispatch) => {};

// function getUniqueId() {
//     //this generates a unique ID based on this specific time
//     // Defining key
//     const key = randomBytes(32);
//     // Defining iv
//     const iv = randomBytes(16);
//     let cipher = createCipheriv('aes-256-cbc', Buffer.from(key), iv);
//     //get the current time...
//     let n = Date.now();
//     let encrypted = cipher.update(n.toString());
//     // Using concatenation
//     encrypted = Buffer.concat([encrypted, cipher.final()]);
//     return encrypted.toString('hex');
// }
