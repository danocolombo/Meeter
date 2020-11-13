import axios from 'axios';
import { fdatasync } from 'fs';
import { setAlert } from './alert';

import {
    SET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
} from './types';

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
    try {
        //let's get the user profile
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
            '@@@@@@@@@@ profile::getCurrentProfile @@@@@@@@@@@@\n: ' +
                util.inspect(res, {
                    showHidden: false,
                    depth: null,
                })
        );

        console.log('\n%%%%%%%%%%%%%%%%%%%%%%%%\n');
        const userRole = res.data.body.role;
        console.log('\nUSER-ROLE: ' + userRole + '\n');
        const uData = {};
        if (res.data.body._id) uData.uid = res.data.body._id;
        if (res.data.body.name) uData.name = res.data.body.name;
        if (res.data.body.email) uData.email = res.data.body.email;
        if (res.data.body.phone) uData.phone = res.data.body.phone;
        if (res.data.body.defaultClient)
            uData.defaultClient = res.data.body.defaultClient;
        if (res.data.body.role) uData.role = res.data.body.role;
        if (res.data.body.status) uData.uid = res.data.body.status;

        //const res = await axios.get('/api/profile/me');
        // payload was res.data
        dispatch({
            type: SET_PROFILE,
            payload: uData,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Get all profiles
// export const getProfiles = () => async dispatch => {
//   dispatch({ type: CLEAR_PROFILE });

//   try {
//     const res = await axios.get('/api/profile');

//     dispatch({
//       type: GET_PROFILES,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: SET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// // Get Github repos
// export const getGithubRepos = username => async dispatch => {
//   try {
//     const res = await axios.get(`/api/profile/github/${username}`);

//     dispatch({
//       type: GET_REPOS,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// Create or update profile
export const createProfile = (formData, history, edit = false) => async (
    dispatch
) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: SET_PROFILE,
            payload: res.data,
        });

        dispatch(
            setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
        );

        if (!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Add Experience
// export const addExperience = (formData, history) => async dispatch => {
//   try {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     };

//     const res = await axios.put('/api/profile/experience', formData, config);

//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data
//     });

//     dispatch(setAlert('Experience Added', 'success'));

//     history.push('/dashboard');
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
//     }

//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// Add Education
// export const addEducation = (formData, history) => async dispatch => {
//   try {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     };

//     const res = await axios.put('/api/profile/education', formData, config);

//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data
//     });

//     dispatch(setAlert('Education Added', 'success'));

//     history.push('/dashboard');
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
//     }

//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// // Delete experience
// export const deleteExperience = id => async dispatch => {
//   try {
//     const res = await axios.delete(`/api/profile/experience/${id}`);

//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data
//     });

//     dispatch(setAlert('Experience Removed', 'success'));
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// Delete education
// export const deleteEducation = id => async dispatch => {
//   try {
//     const res = await axios.delete(`/api/profile/education/${id}`);

//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data
//     });

//     dispatch(setAlert('Education Removed', 'success'));
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            await axios.delete('/api/profile');

            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });

            dispatch(setAlert('Your account has been permanantly deleted'));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    }
};
