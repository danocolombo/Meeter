import axios from 'axios';
import { api_header_config } from './include/api_headers';
import { SET_TMP_GROUP, CLEAR_TMP_GROUP, GROUP_ERROR } from './types.js';

export const getGroup = (gid) => async (dispatch) => {
    console.log('inside smallGroups');
    try {
        dispatch({ type: CLEAR_TMP_GROUP });
        let obj = {
            operation: 'getGroupById',
            payload: {
                groupId: gid,
            },
        };
        let body = JSON.stringify(obj);

        let api2use = process.env.REACT_APP_MEETER_API + '/groups';
        let res = await axios.post(api2use, body, api_header_config);

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

export const testMe = (gid) => async (dispatch) => {
    try {
        console.log('BING');
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
