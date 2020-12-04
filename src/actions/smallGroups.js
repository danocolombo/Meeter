import axios from 'axios';
import { SET_TMP_GROUP, CLEAR_TMP_GROUP, GROUP_ERROR } from './types.js';

export const getGroup = (gid) => async (dispatch) => {
    console.log('inside smallGroups');
    try {
        dispatch({ type: CLEAR_TMP_GROUP });
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
                groupId: gid,
            },
        };
        let body = JSON.stringify(obj);

        let api2use = process.env.REACT_APP_MEETER_API + '/groups';
        let res = await axios.post(api2use, body, config);

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
