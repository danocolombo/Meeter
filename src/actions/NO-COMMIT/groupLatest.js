import axios from 'axios';
import { setAlert } from './alert';
import { api_header_config } from './include/api_headers';
import { CLEAR_TMP_GROUP, SET_TMP_GROUP, GROUP_ERROR } from './types';

// Get group by groupId load in meeting.tmpGroup
export const getGroup = (groupId) => async (dispatch) => {
    try {
        dispatch({ type: CLEAR_TMP_GROUP });

        let obj = {
            operation: 'getGroupById',
            payload: {
                groupId: groupId,
            },
        };
        let body = JSON.stringify(obj);

        let api2use = process.env.REACT_APP_MEETER_API + '/groups';
        let res = await axios.post(api2use, body, api_header_config);
        //const res = await axios.get(`/api/groups/group/${groupId}`);

        dispatch({
            type: SET_TMP_GROUP,
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

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// getGroups was moved to gathering.js
// and done during getMeeting
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Get groups associated with meetingId
// export const getGroups = (mid) => async (dispatch) => {
//     try {
//         dispatch({ type: CLEAR_GROUPS });

//         let obj = {
//             operation: 'getGroupsByMeetingId',
//             payload: {
//                 meetingId: mid,
//             },
//         };
//         let body = JSON.stringify(obj);

//         let api2use = process.env.REACT_APP_MEETER_API + '/groups';
//         let res = await axios.post(api2use, body, api_header_config);
//         //=================================
//         // now lets handle the response
//         //=================================
//         if (res.data.status === '200') {
//             dispatch({
//                 type: SET_GROUPS,
//                 payload: res.data.body,
//             });
//         }
//     } catch (err) {
//         dispatch({
//             type: GROUP_ERROR,
//             payload: {
//                 msg: err.response.statusText,
//                 status: err.response.status,
//             },
//         });
//     }
// };

// Delete group
export const deleteGroup = (groupId) => async (dispatch) => {
    return;
};
// export const deleteGroup = (groupId) => async (dispatch) => {
//     try {
//         const res = await axios.delete(`/api/groups/group/${groupId}`);

//         dispatch({
//             type: DELETE_GROUP,
//             payload: res.data,
//         });
//     } catch (err) {
//         dispatch({
//             type: GROUP_ERROR,
//             payload: {
//                 msg: err.response.statusText,
//                 status: err.response.status,
//             },
//         });
//     }
// };
//clear group information
// export const clearGroup = () => async (dispatch) => {
//     try {
//         dispatch({
//             type: CLEAR_GROUP,
//         });
//     } catch (err) {
//         dispatch({
//             type: GROUP_ERROR,
//             payload: {
//                 msg: err.response.statusText,
//                 status: err.response.status,
//             },
//         });
//     }
// };

// Create or update Group
// the data will come in on formData and we will use history to
// redirect to the meeting after adding the group. The edit
// flag will define if it is new group or updating existing. We
// default to false, which means new, insert the group
export const addGroup = (formData, history, edit = false) => async (
    dispatch
) => {
    return;
};

// export const addGroup = (formData, history, edit = false) => async (
//     dispatch
// ) => {
//     try {
//         if (!formData._id.length > 1) {
//             //this is an add
//             delete formData._id;
//         }
//         // const config = {
//         //     headers: {
//         //         'Content-Type': 'application/json',
//         //     },
//         // };
//         // let res = null;
//         // if (formData._id) {
//         //     res = await axios.post(
//         //         `/api/groups/group/${formData._id}`,
//         //         formData,
//         //         config
//         //     );
//         // } else {
//         //     res = await axios.post(`/api/groups/group/0`, formData, config);
//         // }
//         //=============================================
//         // we either added or updated. refresh redux
//         //=======================================------
//         // const newGroupList = await axios.get(
//         //     `/api/groups/meeting/~{formData.mid}`
//         // );

//         const rose = await axios.get(`/api/groups/meeting/${formData.mid}`);

//         dispatch({
//             type: GET_GROUPS,
//             payload: rose.data,
//         });

//         // await dispatch({
//         //     type: CLEAR_GROUP,
//         //     payload: 'Clear temp group info',
//         // });
//         // dispatch({
//         //     type: GET_GROUPS,
//         //     payload: res.data,
//         // });

//         //===========================
//         // dispatch({
//         //     type: ADD_GROUP,
//         //     payload: res.data,
//         // });
//         dispatch(setAlert(edit ? 'Group Updated' : 'Group Created', 'success'));

//         // if (!edit) {
//         //     const target = '/editGathering/' + formData.mid;
//         //     history.push(target);
//         // }
//         console.log('edit: ' + edit);
//         const target = '/editGathering/' + formData.mid;
//         history.push(target);
//         // history.push('/gatherings');
//     } catch (err) {
//         console.log('actions/group.js addGroup');
//         return err;
//     }
// };
