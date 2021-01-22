import axios from 'axios';
import { api_header_config } from './include/api_headers';
import { setAlert } from './alert';
import { CLEAR_TMP_GROUP, SET_TMP_GROUP, GROUP_ERROR } from './types';
// Get group by groupId load in meeting.tmpGroup
export const addGroup = () => async (dispatch) => {};
export const deleteGroup = () => async (dispatch) => {};
export const getGroup = (groupId) => async (dispatch) => {
    try {
        dispatch({ type: CLEAR_TMP_GROUP });

        // let obj = {
        //     operation: 'getGroupById',
        //     payload: {
        //         groupId: groupId,
        //     },
        // };
        let obj = {
            operation: 'getMeetingByIdAndClient',
            payload: {
                id: '5ef919103598c666597b5e2e',
                clientId: 'wbc',
            },
        };
        let body = JSON.stringify(obj);

        let api2use = process.env.REACT_APP_MEETER_API + '/groups';
        let res = await axios
            .post(api2use, body, api_header_config)
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.response) {
                    console.log(error.response);
                } else {
                    console.log('Error', error.message);
                }
            });
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
export const getGroup1 = (groupId) => async (dispatch) => {
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
