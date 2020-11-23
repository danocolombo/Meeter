import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_GATHERINGS,
    GATHERING_ERROR,
    GET_GATHERING,
    DELETE_GATHERING,
    CLEAR_GATHERINGS,
    CLEAR_GATHERING,
    UPDATE_GATHERING,
    CLEAR_SERVANTS,
    GET_SERVANTS,
    GET_HATHERINGS,
    CLEAR_HATHERINGS,
    // CLEAR_GROUPS
    // GET_GROUPS
} from './types';

//get gatherings
export const getGatherings = (clientId) => async (dispatch) => {
    try {
        //lets get the future meetings
        const config = {
            headers: {
                'Access-Control-Allow-Headers':
                    'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                'Content-Type': 'application/json',
            },
        };
        let client = clientId;
        let obj = {
            operation: 'getFutureMeetings',
            payload: {
                clientId: client,
            },
        };
        let body = JSON.stringify(obj);

        let api2use = process.env.REACT_APP_MEETER_API + '/meetings';
        let res = await axios.post(api2use, body, config);

        if (res.status === 200) {
            console.log('we have ' + res.data.count + ' meetings returned');
            dispatch({ type: CLEAR_GATHERING });
            dispatch({
                type: GET_GATHERINGS,
                payload: res.data.body,
            });
        } else {
            console.log('we got no meetings');
        }
        //------------------------------------
        //get the historical gathererings
        //------------------------------------
        dispatch({ type: CLEAR_HATHERINGS });
        obj = {
            operation: 'getHistoricMeetings',
            payload: {
                clientId: client,
            },
        };
        body = JSON.stringify(obj);
        res = await axios.post(api2use, body, config);

        if (res.status === 200) {
            console.log(
                'we have ' + res.data.count + ' historical meetings returned'
            );

            dispatch({
                type: GET_HATHERINGS,
                payload: res.data.body,
            });
        } else {
            console.log('we got no history ');
        }
    } catch (err) {
        dispatch({
            type: GATHERING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
// Create or update gathering
export const createGathering = (formData, history, edit = false) => async (
    dispatch
) => {
    try {
        // console.log('in action/gatherings.js');
        // console.log(JSON.stringify(formData));
        console.table(formData);
        console.log('that was from actions::gatherings::createGathering');
        // console.log(typeof formData._id);
        // console.log(formData._id.length);
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
                'Content-Type': 'application/json',
            },
        };
        const res = await axios.post('/api/meeting', formData, config);

        dispatch({
            type: GET_GATHERING,
            payload: res.data,
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
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: GATHERING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
// Get gathering
export const getGathering = (mid, cid) => async (dispatch) => {
    //ensure that id is not null, if so return

    // console.log('getGathering:IN');
    if (mid.length < 1) return;
    if (mid === 0) return;
    try {
        //=====================================
        // get the meeting by ID for client

        dispatch({ type: CLEAR_GATHERING });
        const config = {
            headers: {
                'Access-Control-Allow-Headers':
                    'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                'Content-Type': 'application/json',
            },
        };
        let client = cid;
        let obj = {
            operation: 'getMeetingByIdAndClient',
            payload: {
                id: mid,
                clientId: client,
            },
        };
        let body = JSON.stringify(obj);

        let api2use = process.env.REACT_APP_MEETER_API + '/meetings';
        let res = await axios.post(api2use, body, config);

        //const res = await axios.get(`/api/meeting/${id}`);

        dispatch({
            type: GET_GATHERING,
            payload: res.data.body,
        });
        //const tmp = await axios.get(`/api/meeting/${id}`);
        // console.log('res.data [AFTER]' + res.data);
    } catch (err) {
        dispatch({
            type: GATHERING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
// Delete GATHERING
export const deleteGathering = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/meeting/${id}`);

        dispatch({
            type: DELETE_GATHERING,
            payload: id,
        });

        dispatch(setAlert('Meeting Removed', 'success'));
    } catch (err) {
        dispatch({
            type: GATHERING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
// Delete group
export const deleteGroup = (mtgId, groupId) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/meeting/${mtgId}/${groupId}`);

        dispatch({
            type: UPDATE_GATHERING,
            payload: res.data,
        });

        dispatch(setAlert('Group Removed', 'success'));
    } catch (err) {
        dispatch({
            type: GATHERING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
// Edit group
export const editGroup = (mtgId, groupId) => async (dispatch) => {
    // try {
    //     const res = await axios.delete(`/api/meeting/${mtgId}/${groupId}`);
    //     dispatch({
    //         type: UPDATE_GATHERING,
    //         payload: res.data
    //     });
    //     dispatch(setAlert('Group Removed', 'success'));
    // } catch (err) {
    //     dispatch({
    //         type: GATHERING_ERROR,
    //         payload: {
    //             msg: err.response.statusText,
    //             status: err.response.status
    //         }
    //     });
    // }
};
export const createGroup = (formData, history, edit = false) => async (
    dispatch
) => {
    try {
    } catch (err) {}
};
