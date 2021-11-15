import axios from 'axios';
import { setAlert } from './alert';
import {
    //--- Beta5 updates
    MEETING_ERROR,
    CLEAR_MEETING,
    SET_MEETING,
    ADD_GROUP,
    CLEAR_GROUPS,
    TURN_MEEETINGLOADING_OFF,
    DELETE_HATHERING,
    //---
    GET_GATHERINGS,
    GATHERING_ERROR,
    GET_GATHERING,
    DELETE_GATHERING,
    CLEAR_GATHERING,
    UPDATE_GATHERING,
    GET_HATHERINGS,
    CLEAR_HATHERINGS,
    GET_GROUPS,
} from './types';

export const getMeeting = (meetingId) => async (dispatch) => {
    //ensure that id is not null, if so return
    console.log('INSIDE GET MEETING');
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
            operation: 'getMeetingById',
            payload: {
                meetingId: meetingId
            },
        };
        
        let body = JSON.stringify(obj);

        let api2use = process.env.REACT_APP_MEETER_API + '/meetings';
        let res = await axios.post(api2use, body, config);
        
        // const util = require('util');
        // console.log(
        //     'res: ' +
        //         util.inspect(res, { showHidden: false, depth: null })
        // );
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
export const turnoffMeetingLoading = () => async (dispatch) => {
    dispatch({
        type: TURN_MEEETINGLOADING_OFF,
        payload: null
    });

}
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
export const createGathering = (formData, groups = [], history, activeClient) => async (
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
        // } else {
        //     formData.meetingId = formData._id;
        //     //formData._id = '';
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

        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // };
        // const res = await axios.post('/api/meeting', formData, config);

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
// Delete GATHERING
export const deleteGathering0 = (meeting2Delete) => async (dispatch) => {
    try {
        console.log("inside actions/gathering deleteGathering")
        // // 5.6 AWS API call...
        // const config = {
        //     headers: {
        //         'Access-Control-Allow-Headers':
        //             'Content-Type, x-auth-token, Access-Control-Allow-Headers',
        //         'Content-Type': 'application/json',
        //     },
        // };
        // let obj = {
        //     operation: 'deleteMeeting',
        //     payload: {
        //         Key: {
        //             meetingId: meeting2Delete,
        //         },
        //     },
        // };
        // let body = JSON.stringify(obj);

        // let api2use = process.env.REACT_APP_MEETER_API + '/meetings';
        // let res = await axios.post(api2use, body, config);

        // //const res = await axios.get(`/api/meeting/${id}`);


        // dispatch({
        //     type: DELETE_GATHERING,
        //     payload: meeting2Delete,
        // });

        // dispatch(setAlert('Meeting Removed', 'success'));
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
export const addDefaultGroups = (meetingId, defGroups ) => async (dispatch) => {
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
            //=========================================
            // 2. add the group to redux
            //=========================================
            dispatch({
                type: ADD_GROUP,
                payload: res.data.Item
            });
        } else {
            console.log('error adding default group to meeting');
        }
        
    });
    dispatch(setAlert('Default Groups Added', 'success'));
};
export const addDefaultGroupsOLD = (mid, defGroups) => async (dispatch) => {
    
    // going to need the meeting id. We will grab while rotating through...
    
    // // let axiosResponse = null;
    // try {
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     };
    //     for (let i = 0; i < defGroups.length; i++) {
    //         //add each group to database
    //         let obj = {
    //             operation: 'addGroup',
    //             payload: {
    //                 Item: {
    //                     clientId: grps2add[i].clientId,
    //                     meetingId: mid,
    //                     facilitator: grps2add[i].facilitator,
    //                     gender: grps2add[i].gender,
    //                     location: grps2add[i].location,
    //                     title: grps2add[i].title,
    //                 },
    //             },
    //         };
    //         let body = JSON.stringify(obj);

    //         let api2use = process.env.REACT_APP_MEETER_API + '/groups';
    //         let res = await axios.post(api2use, body, config);
    //     }
    //     // now get the groups for the meeting and load in REDUX

    //     let obj = {
    //         operation: 'getGroupsByMeetingId',
    //         payload: {
    //             meetingId: mid,
    //         },
    //     };
    //     let body = JSON.stringify(obj);

    //     let api2use = process.env.REACT_APP_MEETER_API + '/groups';
    //     let res = await axios.post(api2use, body, config);

    //     dispatch({ type: CLEAR_GROUPS });
    //     dispatch({
    //         type: GET_GROUPS,
    //         payload: res.data,
    //         body,
    //     });
    // } catch (err) {
    //     console.log('actions/gatherings.js addDefaultGroups');
    //     console.error(err);
    //     // dispatch({
    //     //     //actions:getGroups
    //     //     type: GROUP_ERROR,
    //     //     payload: {
    //     //         msg: err.response.statusText,
    //     //         status: err.response.status,
    //     //     },
    //     // });
    // }
};
