import axios from 'axios';
import { setAlert } from './alert';
import {
    SET_GROUPS,
    SET_TMP_GROUP,
    CLEAR_GROUPS,
    CLEAR_TMP_GROUP,
    REMOVE_GROUP,
    GROUP_ERROR,
    GET_GROUP,
    CLEAR_GROUP,
} from './types';

// Get groups associated with meetingId
export const getGroups = (mid) => async (dispatch) => {
    try {
        // this is called when gathering is loaded.
        // clear the groups array AND the temporary group
        dispatch({ type: CLEAR_GROUPS });
        dispatch({ type: CLEAR_GROUP });

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
};
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
export const loadDefaultGroup = (groupId) => async (dispatch) => {
    return new Promise((resolve) => {
        return { statusCode: '200', msg: 'TESTING' };
    });
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
        });

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
export const getDefaultGroup = (groupId) => async (dispatch) => {
    // get the group from client.defaultGroups
    // return to calling function
};
export const saveTmpDefaultGroup = (groupId) => async (dispatch) => {
    try {
        dispatch({ type: CLEAR_GROUP });

        // const config = {
        //     headers: {
        //         'Access-Control-Allow-Headers':
        //             'Content-Type, x-auth-token, Access-Control-Allow-Headers',
        //         'Content-Type': 'application/json',
        //     },
        // };

        // let obj = {
        //     operation: 'getGroupById',
        //     payload: {
        //         groupId: groupId,
        //     },
        // };
        // let body = JSON.stringify(obj);

        // let api2use = process.env.REACT_APP_MEETER_API + '/groups';
        // let res = await axios.post(api2use, body, config);
        //const res = await axios.get(`/api/groups/group/${groupId}`);

        // dispatch({
        //     type: SET_TMP_GROUP,
        //     payload: res.data.body,
        // });

        // dispatch({
        //     type: GET_GROUP,
        //     payload: res.data.body,
        // });
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
                    groupId: groupId,
                },
            },
        };
        let body = JSON.stringify(obj);

        let api2use = process.env.REACT_APP_MEETER_API + '/groups';
        let res = await axios.post(api2use, body, config);
        // const util = require('util');
        // console.log('res:  \n' + util.inspect(res, { showHidden: false, depth: null }));
        if (res.status === 200) {
            // send the groupId to remove from redux
            dispatch({
                type: REMOVE_GROUP,
                payload: obj.payload.Key.groupId,
            });
        } else {
            console.log('FAILURE');
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
export const addGroup =
    (formData, currentGroups, history, edit = false) =>
    async (dispatch) => {
        try {
            console.table(formData);
            if (!formData.groupId.length === 1) {
                // we have groupId, it is edit

                edit = false;
            } else {
                edit = true;
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
                    Item: formData,
                },
            };
            let body = JSON.stringify(obj);

            let api2use = process.env.REACT_APP_MEETER_API + '/groups';
            let res = await axios.post(api2use, body, config);

            //--------------------------------------------
            // now get the current groups from ddb
            //--------------------------------------------

            obj = {
                operation: 'getGroupsByMeetingId',
                payload: {
                    meetingId: formData.meetingId,
                },
            };
            body = JSON.stringify(obj);

            //let api2use = process.env.REACT_APP_MEETER_API + '/groups';
            res = await axios.post(api2use, body, config);
            if (res.data.status === '200') {
                dispatch({
                    type: SET_GROUPS,
                    payload: res.data.body,
                });
            }
            dispatch(
                setAlert(edit ? 'Group Updated' : 'Group Added', 'success')
            );

            const target = '/editGathering/' + formData.meetingId;
            history.push(target);
        } catch (err) {
            console.log('actions/group.js addGroup');
            return err;
        }
    };
