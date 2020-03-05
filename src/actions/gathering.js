import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_GATHERINGS,
    GATHERING_ERROR,
    GET_GATHERING,
    DELETE_GATHERING,
    CLEAR_GATHERINGS,
    CLEAR_GATHERING,
    CLEAR_SERVANTS,
    GET_SERVANTS,
    GET_HATHERINGS,
    CLEAR_HATHERINGS
} from './types';

//get gatherings
export const getGatherings = () => async dispatch => {
    try {
        dispatch({ type: CLEAR_GATHERINGS });
        const res = await axios.get('/api/meeting/future');
        dispatch({ type: CLEAR_GATHERING });
        dispatch({
            type: GET_GATHERINGS,
            payload: res.data
        });
        //get the historical gathererings
        dispatch({ type: CLEAR_HATHERINGS });
        const res1 = await axios.get('/api/meeting/history');
        dispatch({
            type: GET_HATHERINGS,
            payload: res1.data
        });
        dispatch({ type: CLEAR_SERVANTS });
        const res2 = await axios.get('/api/person/servants');
        console.log('servants: res is...', typeof res2);
        console.log(typeof res2);
        dispatch({
            type: GET_SERVANTS,
            payload: res2.data
        });
    } catch (err) {
        dispatch({
            type: GATHERING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};
// Create or update gathering
export const createGathering = (
    formData,
    history,
    edit = false
) => async dispatch => {
    try {
        console.log('in action/gatherings.js');
        console.log(formData);
        console.table(formData);
        console.log(typeof formData._id);
        console.log(formData._id.length);
        if (formData._id.length < 1) {
            //this is an add, so delete _id and meetingId from formData
            delete formData._id;
            delete formData.meetingId;
        } else {
            formData.meetingId = formData._id;
            //formData._id = '';
        }
        // if(formData._id) formData.push("meetingId", formData._id);
        //delete formData._id;
        // console.log('transformed formdata');
        // console.log(JSON.stringify(formData));
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post('/api/meeting', formData, config);

        dispatch({
            type: GET_GATHERING,
            payload: res.data
        });

        dispatch(
            setAlert(
                edit ? 'Gathering Updated' : 'Gathering Created',
                'success'
            )
        );

        if (!edit) {
            history.push('/gatherings');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: GATHERING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};
// Get gathering
export const getGathering = id => async dispatch => {
    //endure that id is not null, if so return
    if (id.length < 1) return;
    if (id == 0) return;
    try {
        dispatch({ type: CLEAR_GATHERING });
        const res = await axios.get(`/api/meeting/${id}`);

        dispatch({
            type: GET_GATHERING,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GATHERING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};
// Delete GATHERING
export const deleteGathering = id => async dispatch => {
    try {
        await axios.delete(`/api/meeting/${id}`);

        dispatch({
            type: DELETE_GATHERING,
            payload: id
        });

        dispatch(setAlert('Meeting Removed', 'success'));
    } catch (err) {
        dispatch({
            type: GATHERING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};
