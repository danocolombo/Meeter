import axios from 'axios';
import { setAlert } from './alert';
import {
    //----Base5---
    CLEAR_GROUPS,
    SET_GROUPS,
    SET_TMP_GROUP,
    CLEAR_TMP_GROUP,
    ADD_GROUP,
    REMOVE_GROUP,
    //------------
    GET_GROUPS,
    GROUP_ERROR,
    DELETE_GROUP,
    GET_GROUP,
    CLEAR_GROUP,
} from './types';

// Get groups associated with meetingId
export const getGroups = (mid) => async (dispatch) => {
    try {
        // this is called when gathering is loaded. 
        // clear the groups array AND the temporary group
        dispatch({ type: CLEAR_GROUPS });
        dispatch({ type: CLEAR_GROUP});

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
                type: SET_GROUPS,
                payload: res.data.body,
            });
        }
    } catch (err) {
        dispatch({
            type: GROUP_ERROR,
            payload: {
                // msg: err.response.statusText,
                //status: err.response.status,
                msg: 'that did not work',
                status: err,
            },
        });
    }
};
// clear tmp group
export const clearTmpGroup = () => async (dispatch) => {
    try {
        dispatch({
            type: CLEAR_TMP_GROUP,
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
}
// clear groups
export const clearGroups = () => async (dispatch) => {
    try {
        dispatch({ type: CLEAR_GROUP });
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
        dispatch({ type: CLEAR_GROUP });
        const config = {
            headers: {
                'Access-Control-Allow-Headers':
                    'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                'Content-Type': 'application/json',
            },
        };

        let obj = {
            operation: 'getGroupById',
            payload: {
                groupId: groupId,
            },
        };
        let body = JSON.stringify(obj);

        let api2use = process.env.REACT_APP_MEETER_API + '/groups';
        let res = await axios.post(api2use, body, config);
        //const res = await axios.get(`/api/groups/group/${groupId}`);

        dispatch({
            type: SET_TMP_GROUP,
            payload: res.data.body,
        })

        dispatch({
            type: GET_GROUP,
            payload: res.data.body,
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
        console.log("action/group::deleteGroup");
        console.log("groupId: " + groupId);
        const config = {
            headers: {
                'Access-Control-Allow-Headers':
                    'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                'Content-Type': 'application/json',
            },
        };
        //==========================================================
        // note for delete, payload needs to be wrapped with Item
        //==========================================================
        let obj = { 
            operation: 'deleteGroup',
            payload: {
                Key: {
                    groupId: groupId
                }
            }
        };
        let body = JSON.stringify(obj);

        let api2use = process.env.REACT_APP_MEETER_API + '/groups';
        let res = await axios.post(api2use, body, config);
        // const util = require('util');
        // console.log('res:  \n' + util.inspect(res, { showHidden: false, depth: null }));

        // on delete, we don't get body back, so send obj to redux to remove
        if (res.status == '200'){
            dispatch({
                type: REMOVE_GROUP,
                payload: obj.payload.Key,
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
//clear group information
export const clearGroup = () => async (dispatch) => {
    try {
        dispatch({
            type: CLEAR_GROUP,
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

// Create or update Group
// the data will come in on formData and we will use history to
// redirect to the meeting after adding the group. The edit
// flag will define if it is new group or updating existing. We
// default to false, which means new, insert the group
export const addGroup = (formData, history, edit = false) => async (
    dispatch
) => {
    try {
        console.log('the length of groupId is ' + formData.groupId.length);
        console.log('proof...>>>' + formData.groupId + "<<<");
        console.table(formData);
        if (!formData.groupId.length == 1) {
            // we have groupId, it is edit
            // delete formData._id;
            edit = true;
        }else{
            edit = false;
        }
        //============================================
        // new call to AWS API gateway
        //=============================================
        const config = {
            headers: {
                'Access-Control-Allow-Headers':
                    'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                'Content-Type': 'application/json',
            },
        };
        
        //==========================================================
        // note for API, payload needs to be wrapped with Item
        //==========================================================
        let obj = { 
            operation: 'addGroup',
            payload: {
                Item:  formData
            }
        };
        let body = JSON.stringify(obj);

        let api2use = process.env.REACT_APP_MEETER_API + '/groups';
        let res = await axios.post(api2use, body, config);
        

        // send the object to get added to redux meeting.groups
        if (res.status == '200'){
            dispatch({
                type: ADD_GROUP,
                payload: res.data.Item,
            });

        }

        dispatch(setAlert(edit ? 'Group Updated' : 'Group Added', 'success'));

        const target = '/editGathering/' + formData.meetingId;
        history.push(target);
    } catch (err) {
        console.log('actions/group.js addGroup');
        return err;
    }
};
