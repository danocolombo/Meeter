import axios from 'axios';
import moment from 'moment';
import { setAlert } from './alert';

import {
    CLEAR_MEETING,
    SET_MEETING,
    TURN_MEEETINGLOADING_OFF,
    DELETE_HATHERING,
    SET_GROUPS,
    //---
    GET_GATHERINGS,
    GATHERING_ERROR,
    GET_GATHERING,
    DELETE_GATHERING,
    CLEAR_GATHERING,
    GET_HATHERINGS,
    CLEAR_HATHERINGS,
} from './types';

export const getMeeting = (meetingId) => async (dispatch) => {
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
            operation: 'getMeetingById',
            payload: {
                meetingId: meetingId
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
        setAlert('getMeeting error.', 'danger');
    }
};
//#########################
//get gatherings
//#########################
export const turnoffMeetingLoading = () => async (dispatch) => {
    dispatch({
        type: TURN_MEEETINGLOADING_OFF,
        payload: null
    });

}
export const getGatherings = (clientId) => async (dispatch) => {
    try {
        //clear all the group related data
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
        let dateToday = moment().format("YYYY-MM-DD");
        let obj = {
            operation: 'getActiveMeetings',
            payload: {
                clientId: client,
                testDate: dateToday,
            },
        };
        let body = JSON.stringify(obj);

        let api2use = process.env.REACT_APP_MEETER_API + '/meetings';
        let res = await axios.post(api2use, body, config);

        if (res.status === 200) {
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
export const createGathering = (formData, groups = [], history, activeClient) => async (
    dispatch
) => {
    try {
        //==========================================
        // throw group information to database
        //==========================================
        if (groups) {
            for ( let grp in groups){
                console.log(grp["title"]);

            
            }
        }
        //-----------------------------------------------
        // need to add the tenantId to the data to put
        //-----------------------------------------------
        formData.clientId = activeClient;
        console.log('==================================');
        const util = require('util');
        console.log('formData:  \n' + util.inspect(formData, { showHidden: false, depth: null }));


        console.log('===========================');
        if (formData.meetingId.length < 1) {
            //this is an add, so delete _id and meetingId from formData
            // delete formData._id;
            // delete formData.meetingId;
            formData.meetingId = "0";
        }
        

        //==========================================
        // new 5.5 AWS API call
        //==========================================
        const config = {
            headers: {
                'Access-Control-Allow-Headers':
                    'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                'Content-Type': 'application/json',
            },
        };
        let obj = {
            operation: 'putMeeting',
            payload: {
                Item: formData,
            },
        };
        let body = JSON.stringify(obj);

        let api2use = process.env.REACT_APP_MEETER_API + '/meetings';
        let res = await axios.post(api2use, body, config);

        dispatch({
            type: SET_MEETING,
            payload: res.data,
        });

        dispatch(
            setAlert((formData.meetingId > 0) ? 'Meeting Updated' : 'Meeting Created', 'success')
        );

        if (formData.meetingId === 0) {
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
export const getGathering = (mid) => async (dispatch) => {
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
        let obj = {
            operation: 'getMeetingById',
            payload: {
                meetingId: mid,
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
export const deleteGathering = (meeting2Delete, view) => async (dispatch) => {
    try {
        // 5.6 AWS API call...
        const config = {
            headers: {
                'Access-Control-Allow-Headers':
                    'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                'Content-Type': 'application/json',
            },
        };
        let obj = {
            operation: 'deleteMeeting',
            payload: {
                Key: {
                    meetingId: meeting2Delete,
                },
            },
        };
        let body = JSON.stringify(obj);

        let api2use = process.env.REACT_APP_MEETER_API + '/meetings';
        let res = await axios.post(api2use, body, config);
        if (view === true){
            dispatch({
                type: DELETE_GATHERING,
                payload: meeting2Delete,
            });
        }else{
            dispatch({
                type: DELETE_HATHERING,
                payload: meeting2Delete,
            });
        }

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
}

export const addDefaultGroups = (meetingId, defGroups, existingGroups ) => async (dispatch) => {
    //===================================
    // for each default group, add it
    //===================================
    
    const config = {
        headers: {
            'Access-Control-Allow-Headers':
                'Content-Type, x-auth-token, Access-Control-Allow-Headers',
            'Content-Type': 'application/json',
        },
    };
    defGroups.map(async (group) => {
        // 1. add group to groups table in DDB
        // API requires that we send "title", not "groupTitle"
        // and we need to add meetingsId
        let defGroup = {};
        for (var key in group) {
            if (group.hasOwnProperty(key)) {
                if (key === "groupTitle"){
                    defGroup.title = group[key];
                }else{
                    defGroup[key] = group[key];
                }
            }
        }
        defGroup.meetingId = meetingId;
        let obj = {
            operation: 'addGroup',
            payload: {
                Item: defGroup
            },
        };
        let body = JSON.stringify(obj);
        let api2use = process.env.REACT_APP_MEETER_API + '/groups';
        let res = await axios.post(api2use, body, config);

        if (res.status === 200) {
            //-------------------------------------
            // get resulting groups from ddb
            //-------------------------------------
            obj = {
                operation: 'getGroupsByMeetingId',
                payload: {
                    meetingId: meetingId,
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


        } else {
            console.log('error adding default group to meeting');
        }
        
    });
    dispatch(setAlert('Default Groups Added', 'success'));
};

