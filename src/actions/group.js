import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_GROUPS,
    GROUP_ERROR,
    DELETE_GROUP,
    GET_GROUP,
    CLEAR_GROUPS,
} from './types';

// Get groups associated with meetingId
export const getGroups = (mid) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Access-Control-Allow-Headers':
                    'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                'Content-Type': 'application/json',
            },
        };

        let obj = {
            operation: 'getGroupsByMeetingId',
            payload: {
                meetingId: mid,
            },
        };
        let body = JSON.stringify(obj);

        let api2use = process.env.REACT_APP_MEETER_API + '/groups';
        let res = await axios.post(api2use, body, config);
        //=================================
        // now lets handle the response
        //=================================
        let proceed = false;
        if (res.data.status === '200') {
            dispatch({
                type: GET_GROUPS,
                payload: res.data.body,
            });
        }
    } catch (err) {
        dispatch({
            type: GROUP_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
// Get group by groupId
export const getGroup = (groupId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/groups/group/${groupId}`);

        dispatch({
            type: GET_GROUP,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GROUP_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Delete group
export const deleteGroup = (groupId) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/groups/group/${groupId}`);

        dispatch({
            type: DELETE_GROUP,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GROUP_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Create or update groups
export const createGroup = (formData, history, edit = false) => async (
    dispatch
) => {
    try {
        if (formData._id.length < 1) {
            //this is an add, so delete groupId from formData
            delete formData.groupId;
        } else {
            formData.meetingId = formData._id;
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await axios.post(
            '/api/groups/group/{$_id}',
            formData,
            config
        );

        dispatch({
            type: GET_GROUP,
            payload: res.data,
        });

        dispatch(setAlert(edit ? 'Group Updated' : 'Group Created', 'success'));

        if (!edit) {
            history.push('/group');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: GROUP_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
