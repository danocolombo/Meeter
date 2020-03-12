import axios from 'axios';
import { setAlert } from './alert';
import { GET_GROUPS, GROUP_ERROR } from './types';

// Get groups associated with meetingId
export const getGroups = meetingId => async dispatch => {
    try {
        const res = await axios.get(`/api/meeting/${meetingId}/groups`);

        dispatch({
            type: GET_GROUPS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GROUP_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};
// Create or update groups
export const createGroup = (
    formData,
    history,
    edit = false
) => async dispatch => {
    try {
        if (formData._id.length < 1) {
            //this is an add, so delete groupId from formData
            delete formData.groupId;
        } else {
            formData.meetingId = formData._id;
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post(
            '/api/meeting/{$_id}/group',
            formData,
            config
        );

        dispatch({
            type: GET_GROUP,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Group Updated' : 'Group Created', 'success'));

        if (!edit) {
            history.push('/group');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: GROUP_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};
