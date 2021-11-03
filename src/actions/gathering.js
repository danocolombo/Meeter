import axios from 'axios';
import { setAlert } from './alert';
import {
    //--- Beta5 updates
    MEETING_ERROR,
    CLEAR_MEETING,
    SET_MEETING,
    CLEAR_GROUPS,
    //---
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
    GET_GROUPS,
    CLEAR_GROUP,
} from './types';
export const getMeeting = (meetingId, clientId) => async (dispatch) => {
    //ensure that id is not null, if so return

    // console.log('getGathering:IN');
    if (meetingId.length < 1) return;
    if (meetingId === 0) return;
    try {
        //=====================================
        // get the meeting by ID for client

        dispatch({ type: CLEAR_MEETING });
        const config = {
            headers: {
                'Access-Control-Allow-Headers':
                    'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                'Content-Type': 'application/json',
            },
        };
        let obj = {
            operation: 'getMeetingByIdAndClient',
            payload: {
                id: meetingId,
                clientId: clientId,
            },
        };
        let body = JSON.stringify(obj);

        let api2use = process.env.REACT_APP_MEETER_API + '/meetings';
        let res = await axios.post(api2use, body, config);

        dispatch({
            type: SET_MEETING,
            payload: res.data.body,
        });
    } catch (err) {
        dispatch({
            type: MEETING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
//#########################
//get gatherings
//#########################
export const getGatherings = (clientId) => async (dispatch) => {
    try {
        //clear all the group related data
        // dispatch({ type: CLEAR_GROUPS });
        dispatch({ type: CLEAR_MEETING });
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
            
            // dispatch({ type: CLEAR_GATHERING });
            if (res.data.count > 0){
                dispatch({
                    type: GET_GATHERINGS,
                    payload: res.data.body,
                });
            }
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
            
            if (res.data.count > 0){
                dispatch({
                    type: GET_HATHERINGS,
                    payload: res.data.body,
                });
            }
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
        //================================================
        // this will add (create) a new meeting
        //================================================
        // We don't always know what data we are going to
        // get, but we will require certain fields
        //================================================
        /*
            {'operation': 'createMeeting',
               'payload': {
                  'Item': {
                    'clientId': 'test',
                    'meetingDate': '2020-11-15',
                    'meetingType': 'TEST',
                    'supportRole': 
                    'Dano','title': 'addTestMeeting'
                  }
                }
            }
        */
        let Item = formData;
        let obj = {
            operation: 'addGroup',
            payload: {
                Item,
            },
        };
        console.log('our humble attempt\n');
        console.log(JSON.stringify(obj));

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        let body = JSON.stringify(obj);

        let api2use = process.env.REACT_APP_MEETER_API + '/groups';
        let res = await axios.post(api2use, body, config);

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
        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // };
        // const res = await axios.post('/api/meeting', formData, config);

        // dispatch({
        //     type: GET_GATHERING,
        //     payload: res.data,
        // });

        // dispatch(
        //     setAlert(
        //         edit ? 'Gathering Updated' : 'Gathering Created',
        //         'success'
        //     )
        // );

        // if (!edit) {
        //     history.push('/gatherings');
        // }
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
export const addDefaultGroups = (grps2add, mid) => async (dispatch) => {
    console.log('in actions/gatherings :: addDefaultGroups');
    console.log('typeof grps2add: ' + typeof grps2add);
    const util = require('util');
    console.log(
        'defaultGroups: ' +
            util.inspect(grps2add, { showHidden: false, depth: null })
    );

    // going to need the meeting id. We will grab while rotating through...
    let meetingId = mid;
    // let axiosResponse = null;
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        for (let i = 0; i < grps2add.length; i++) {
            //add each group to database
            let obj = {
                operation: 'addGroup',
                payload: {
                    Item: {
                        clientId: grps2add[i].clientId,
                        meetingId: mid,
                        facilitator: grps2add[i].facilitator,
                        gender: grps2add[i].gender,
                        location: grps2add[i].location,
                        title: grps2add[i].title,
                    },
                },
            };
            let body = JSON.stringify(obj);

            let api2use = process.env.REACT_APP_MEETER_API + '/groups';
            let res = await axios.post(api2use, body, config);
        }
        // now get the groups for the meeting and load in REDUX

        let obj = {
            operation: 'getGroupsByMeetingId',
            payload: {
                meetingId: mid,
            },
        };
        let body = JSON.stringify(obj);

        let api2use = process.env.REACT_APP_MEETER_API + '/groups';
        let res = await axios.post(api2use, body, config);

        dispatch({ type: CLEAR_GROUPS });
        dispatch({
            type: GET_GROUPS,
            payload: res.data,
            body,
        });
    } catch (err) {
        console.log('actions/gatherings.js addDefaultGroups');
        console.error(err);
        // dispatch({
        //     //actions:getGroups
        //     type: GROUP_ERROR,
        //     payload: {
        //         msg: err.response.statusText,
        //         status: err.response.status,
        //     },
        // });
    }
};
