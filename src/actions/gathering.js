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
export const getGatherings = (activeClient) => async (dispatch) => {
    //------------------------------------------------------
    // we can only get meetings when we know the client
    //------------------------------------------------------
    if (typeof activeClient !== 'undefined') {
        return '';
    }
    try {
        // dispatch({ type: CLEAR_GATHERINGS });
        //================================================
        // need to get future gatherings
        //new header for AWS call
        const config = {
            heaers: {
                'Access-Control-Allow-Headers':
                    'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                'Content-Type': 'application-json',
            },
        };
        console.log('activeClient:' + activeClient);
        let obj = {
            operation: 'getFutureMeetings',
            payload: { clientId: activeClient },
        };
        const body = JSON.stringify(obj);
        const res = await axios.post(
            'https://2byneyioe4.execute-api.us-east-1.amazonaws.com/dev/meeting',
            body,
            config
        );

        // const res = await axios.get('/api/meeting/future');
        dispatch({ type: CLEAR_GATHERING });
        dispatch({
            type: GET_GATHERINGS,
            payload: res.data,
        });
        //get the historical gathererings
        dispatch({ type: CLEAR_HATHERINGS });
        const res1 = await axios.get('/api/meeting/history');
        dispatch({
            type: GET_HATHERINGS,
            payload: res1.data,
        });
        dispatch({ type: CLEAR_SERVANTS });
        const res2 = await axios.get('/api/person/servants');
        // console.log('servants: results are...', typeof res2);
        // console.log(JSON.stringify(res2));
        //==========================================
        // we want to insert blank option in the list
        // before returning
        //===========================================
        // create blank object
        //===========================================
        // const newList = {
        //     _id:"",
        //     name:"",
        //     servant:"",
        //     __v: 0,
        //     date:"",
        //     training:[]
        // }
        // console.log(JSON.stringify(newList));
        // console.log('-----------');
        //===========================================
        // combine blank object with response from db
        //===========================================
        //function extend(newList, res2) {
        // for(var key in res2) {
        //     newList[key] = res2[key];
        // }
        // //    return dest;
        // console.log(JSON.stringify(newList));

        dispatch({
            type: GET_SERVANTS,
            payload: res2.data,
        });
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
export const getGathering = (id) => async (dispatch) => {
    //endure that id is not null, if so return

    // console.log('getGathering:IN');
    if (id.length < 1) return;
    if (id === 0) return;
    try {
        // dispatch({ type: CLEAR_GROUPS });
        // const resGrp = await axios.get(`/api/groups/meeting/${id}`);
        // dispatch({
        //     type: GET_GROUPS,
        //     payload: resGrp.data
        // });
        //console.log('getGathering:TRY');
        // console.log('id:' + id);
        dispatch({ type: CLEAR_GATHERING });
        const res = await axios.get(`/api/meeting/${id}`);

        dispatch({
            type: GET_GATHERING,
            payload: res.data,
        });
        const tmp = await axios.get(`/api/meeting/${id}`);
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
