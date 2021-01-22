import axios from 'axios';
// const mongoose = require('mongoose');
import { setAlert } from './alert';
import {
    GET_GROUPS,
    GROUP_ERROR,
    DELETE_GROUP,
    DELETE_GROUPS,
    CLEAR_GROUP,
    ADD_GROUP,
    GET_GROUP,
    SET_DEFAULT_GROUPS,
    // UPDATE_GROUP,
    // CLEAR_GROUPS,
    // SET_GROUP,
} from './types';
// import { mongo, Mongoose } from 'mongoose';

// Get groups associated with meetingId
export const getGroups = (mid) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/groups/meeting/${mid}`);

        dispatch({
            type: GET_GROUPS,
            payload: res.data,
        });
    } catch (err) {
        console.log('actions/group.js getGroups');
        console.log('GET /api/groups/meeting/' + mid);
        dispatch({
            //actions:getGroups
            type: GROUP_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
// Clear REDUX group
export const clearGroup = () => async (dispatch) => {
    try {
        await dispatch({
            type: CLEAR_GROUP,
            payload: 'Clear temp group info',
        });
        // dispatch(setAlert('Group removed', 'success'));
    } catch (err) {
        console.log('actions/group.js clearGroup');
        console.log('DISPATCH TO CLEAR REDUX');
        dispatch({
            //actions:clearGroup
            type: GROUP_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
// Delete group
export const deleteGroup = (groupId, mid) => async (dispatch) => {
    try {
        if (!typeof groupId === undefined) {
            if (groupId.length > 1) {
                try {
                } catch (error) {}
            }
        }

        await axios.delete(`/api/groups/${groupId}`);
        dispatch({
            type: DELETE_GROUP,
            payload: groupId,
        });
        // reload the groups
        const res = await axios.get(`/api/groups/meeting/${mid}`);

        dispatch({
            type: GET_GROUPS,
            payload: res.data,
        });
        dispatch(setAlert('Group removed', 'success'));
    } catch (err) {
        console.log('actions/group.js deleteGroup');
        console.log('DELETE /api/groups/' + groupId);
        console.log('GET /api/groups/meeting/' + mid);
        console.log('DISPATCH TO RELOAD GROUPS IN REDUX');
        dispatch({
            //actions:deleteGroup
            type: GROUP_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
export const removeDefGroup = (cid, gid) => async (dispatch) => {
    //this removes the group id from defaultGroups in
    // client document and removes from meeter.defaultGroups

    try {
        await axios.delete(`/api/client/defaultgroup/${cid}/${gid}`);
        //-----------------------------------
        // instead of cleaning up redux, just
        // flush and reload.
        //------------------------------------
        const res = await axios.get(`/api/client/defaultgroups/${cid}`);
        if (res) {
            dispatch({
                type: SET_DEFAULT_GROUPS,
                payload: res.data,
            });
        } else {
            console.log('NO DEFAULT GROUPS RETURNED');
        }

        // await axios.delete(`/api/groups/${groupId}`);
        // dispatch({
        //     type: DELETE_GROUP,
        //     payload: groupId,
        // });
        // // reload the groups
        // const res = await axios.get(`/api/groups/meeting/${mid}`);

        // dispatch({
        //     type: GET_GROUPS,
        //     payload: res.data,
        // });
        dispatch(setAlert('Default Group Removed', 'success'));
    } catch (err) {
        console.log('actions/group.js removeDefGroup');
        console.log('DELETE /api/client/defaultgroup/' + cid + '/' + gid);
        console.log('GET /api/client/defaultgroups/' + cid);
        console.log('DISPATCH TO SET_DEFAULT_GROUPS IN REDUX');
        dispatch({
            //actions:deleteGroup
            type: GROUP_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
// deleteGroupsByMeeting
// this is used to remove all the groups associated with a meeting
export const deleteGroupsByMeeting = (mid) => async (dispatch) => {
    try {
        console.log('DDDDDDDDDDDDDDDDDDDDDDDDD');
        console.log('actions/group.js :: deleteGroupsByMeeting (' + mid + ')');
        await axios.delete(`/api/groups/bymeeting/${mid}`);
        dispatch({
            type: DELETE_GROUPS,
            payload: mid,
        });
        // reload the groups
        // const res = await axios.get(`/api/groups/meeting/${mid}`);
        // dispatch(setAlert('Groups removed', 'success'));
    } catch (err) {
        console.log('actions/group.js deleteGroupsByMeeting');
        console.log('DELETE /api/groups/bymeeting/' + mid);
        dispatch({
            //actions:deleteGroupsByMeeting
            type: GROUP_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// export const getGroups2 = mid => async dispatch => {
//     try {
//         // dispatch({ type: CLEAR_GROUPS });
//         const res = await axios.get(`/api/groups/meeting/${mid}`);

//         dispatch({
//             type: GET_GROUPS,
//             payload: res.data
//         });
//     } catch (err) {
//         dispatch({
//             type: GROUP_ERROR,
//             payload: {
//                 msg: err.response.statusText,
//                 status: err.response.status
//             }
//         });
//     }
// };
// Get group by groupId
export const getGroup = (groupId) => async (dispatch) => {
    try {
        // dispatch({ type: CLEAR_GROUP });
        const res = await axios.get(`/api/groups/${groupId}`);
        dispatch({
            type: GET_GROUP,
            payload: res.data,
        });
    } catch (err) {
        console.log('actions/group.js getGroup');
        console.log('DELETE /api/groups/' + groupId);
        dispatch({
            //getGroup
            type: GROUP_ERROR,
            //actions:getGroup
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
        if (!formData._id.length > 1) {
            //this is an add
            delete formData._id;
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        let res = null;
        if (formData._id) {
            res = await axios.post(
                `/api/groups/group/${formData._id}`,
                formData,
                config
            );
        } else {
            res = await axios.post(`/api/groups/group/0`, formData, config);
        }
        //=============================================
        // we either added or updated. refresh redux
        //=======================================------
        const newGroupList = await axios.get(
            `/api/groups/meeting/~{formData.mid}`
        );

        const rose = await axios.get(`/api/groups/meeting/${formData.mid}`);

        dispatch({
            type: GET_GROUPS,
            payload: rose.data,
        });

        // await dispatch({
        //     type: CLEAR_GROUP,
        //     payload: 'Clear temp group info',
        // });
        // dispatch({
        //     type: GET_GROUPS,
        //     payload: res.data,
        // });

        //===========================
        // dispatch({
        //     type: ADD_GROUP,
        //     payload: res.data,
        // });
        dispatch(setAlert(edit ? 'Group Updated' : 'Group Created', 'success'));

        // if (!edit) {
        //     const target = '/editGathering/' + formData.mid;
        //     history.push(target);
        // }
        console.log('edit: ' + edit);
        const target = '/editGathering/' + formData.mid;
        history.push(target);
        // history.push('/gatherings');
    } catch (err) {
        console.log('actions/group.js addGroup');
        return err;
    }
};

// Create or update groups
export const OLDcreateGroup = (formData, history, edit = false) => async (
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
            //actions:oldCreateGroup
            type: GROUP_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
