import axios from 'axios';
import { setAlert } from './alert';
import {
    SET_CLIENT_USERS,
    ADMIN_ERROR,
    SET_DEFAULT_GROUPS,
    REMOVE_CLIENT_USER,
    SET_MTG_CONFIGS,
    TOGGLE_CONFIG,
    POST_ERROR,
} from './types';

// GET CLIENT INFO
export function testMe(cid) {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@');
    console.log('actions/admin :: testMe (' + cid + ')');
}
export const getClientInfo = (cid) => async (dispatch) => {
    try {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log('actions/admin :: getClientInfo (' + cid + ')');
    } catch (err) {
        console.log('actions/admin.js getClientInfo ADMIN_ERROR');
        dispatch({
            type: ADMIN_ERROR,
        });
    }
};
export const getClientUsers = (client) => async (dispatch) => {
    // console.log('getClientUsers(' + client + ')');
    // console.log('/api/client/userstatus/' + client);
    try {
        const res = await axios.get(`/api/client/userstatus/${client}`);
        dispatch({
            type: SET_CLIENT_USERS,
            payload: res.data,
        });
    } catch (err) {
        console.log('actions/admin.js getClientUsers ADMIN_ERROR');
        dispatch({
            type: ADMIN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
export const getMtgConfigs = (cid) => async (dispatch) => {
    // this function is no longer needed, since it is done
    // at login
    return;
};
export const getDefGroups = (cid) => async (dispatch) => {
    return;
    //-------------------------
    // this function was moved to login
    //----------------------------------

    // try {
    //     const res = await axios.get(`/api/client/defaultgroups/${cid}`);
    //     if (res) {
    //         dispatch({
    //             type: SET_DEFAULT_GROUPS,
    //             payload: res.data,
    //         });
    //     } else {
    //         console.log('NO DEFAULT GROUPS RETURNED');
    //     }
    // } catch (err) {
    //     console.log('actions/admin.js getDefGroups ADMIN_ERROR');
    //     dispatch({
    //         type: ADMIN_ERROR,
    //         // payload: {
    //         //     msg: err.response.statusText ? err.response.statusText : '',
    //         //     status: err.response.status,
    //         // },
    //     });
    // }
};
export const updateDefaultGroup = (revised) => async (dispatch) => {
    // console.log('getting the work done.');
    // console.log('_id:' + revised._id);
    // console.log('client: ' + revised.cid);
    // console.log('gender: ' + revised.gender);
    // console.log('title: ' + revised.title);
    // console.log('location: ' + revised.location);
    // console.log('facilitator: ' + revised.gender);
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await axios.put(
            `/api/client/defaultgroup`,
            revised,
            config
        );
        if (!res) console.log('no response');
        // now get the default groups and reload Redux
        const ress = await axios.get(
            `/api/client/defaultgroups/${revised.cid}`
        );
        dispatch({
            type: SET_DEFAULT_GROUPS,
            payload: ress.data,
        });
        dispatch(setAlert('Default Group Updated.', 'success'));
    } catch (err) {
        console.log('actions/admin.js updateDefaultGroup ADMIN_ERROR');
        dispatch(setAlert('Default Group Update Failed.', 'danger'));
    }
};
export const deleteDefaultGroup = (cid, gid) => async (dispatch) => {
    // need to remove the default group from the client doc using
    // the client id (cid) and the groups indicator (gid);
    try {
        await axios.delete(`/api/client/defaultgroup/${cid}/${gid}`);
        // then get the groups and reload redux
        const res = await axios.get(`/api/client/defaultgroups/${cid}`);
        if (res) {
            dispatch({
                type: SET_DEFAULT_GROUPS,
                payload: res.data,
            });
        } else {
            console.log('NO DEFAULT GROUPS RETURNED');
        }
        console.log('tried...');
    } catch (error) {
        console.log('CATCH....');
    }
};
export const grantUserRegistration = (cid, id, role, email) => async (
    dispatch
) => {
    // this is called from Admin/DisplaySecurity when a user with permission has
    // decided to add a perosn to their client.  We first add them to the client
    // list of users, then add them to people.
    //---------------------------------
    // update client entry first
    //----------------------------------
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let res = null;
    try {
        //-----------------------------
        // first update the client users
        //------------------------------
        let updateClientUser = {};
        updateClientUser._id = id;
        updateClientUser.cid = cid;
        updateClientUser.email = email;
        updateClientUser.role = role;
        updateClientUser.status = 'approved';

        res = await axios.put('/api/client/user', updateClientUser, config);

        //------------------------------------------
        // now check if the user is already on team
        //------------------------------------------
        let potentialPeep = {};
        potentialPeep.cid = cid;
        potentialPeep.email = email;
        console.log('before validateemail call ');
        // let res = null;
        try {
            res = await axios.post(
                '/api/people/validateemail',
                potentialPeep,
                config
            );
            //------------------------------------------------
            // if the person is in the system it will not get
            // an error, so we fall through. If they are not
            // in the people collection, it will get 404 and
            // fall into the catch below to add them.
            //------------------------------------------------
            console.log('this one is on the team, not adding');
        } catch (error) {
            //no info for user, we can add them now

            console.log('not on team, add them.');
            // need to get user info
            const userRef = await axios.get(`/api/users/identify/${id}`);
            let personInfo = {};

            personInfo.tenantId = 'people-' + cid;
            personInfo.name = userRef.data.name;
            personInfo.email = userRef.data.email;
            personInfo.defaultClient = userRef.data.defaultClient;

            // then pass the user to the people table
            const peopleRef = await axios.post(
                '/api/people',
                personInfo,
                config
            );
            if (!peopleRef) console.log('no resonse from /api/people post');
        }
    } catch (err) {
        console.log('actions/admin.js grantUserRegistration ADMIN_ERROR #1');
        dispatch({
            type: ADMIN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
    try {
        const resz = await axios.get(`/api/client/userstatus/${cid}`);
        dispatch({
            type: SET_CLIENT_USERS,
            payload: resz.data,
        });
    } catch (err) {
        console.log('actions/admin.js grantUserRegistration ADMIN_ERROR #2');
        dispatch({
            type: ADMIN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
export const rejectUserRegistration = (cid, id, email) => async (dispatch) => {
    // this is called from Admin/DisplaySecurity when a user with permission has
    // decided to reject a registration request.  We remove the user from
    // client collection document for the client.
    //=============================
    try {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        console.log('actions/admin :: rejectUserRegistration');
        //delete user from client document
        await axios.delete(`/api/client/user/${cid}/${id}`);
        console.log('deleted user from client doc');
        //delete user from user document
        console.log('email: ' + email);
        console.log('need to delete them from people...');
        console.log('/api/people/byemail/' + cid + '/' + email);
        await axios.delete(`/api/people/byemail/${cid}/${email}`);
        // await axios.delete(`/api/users/email/${email}`);
        console.log('deleted user from users doc');
        //get remaining client users
        const res = await axios.get(`/api/client/userstatus/${cid}`);
        console.log('got remaining users');

        dispatch({
            type: SET_CLIENT_USERS,
            payload: res.data,
        });
        dispatch(setAlert('User Removed', 'success'));
    } catch (err) {
        console.log('actions/admin.js rejectUserRegistration ADMIN_ERROR');
        dispatch({
            type: ADMIN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
export const addNewDefaultGroup = (c, g, t, l, f) => async (dispatch) => {
    // this adds the group as a default for the client
};
export const removeDefGroup = (cid, gid) => async (dispatch) => {
    //this removes the user id from client users
    // in database and removes from meeter.clientUsers
    //-----
    // uid is the reference in the users array in the client document
    // need email to delate the user from user document.
    try {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        console.log('copied from another function that is called');
        console.log('actions/admin :: removeDefGroup ' + cid + gid);
        await axios.delete(`/api/client/defaultgroup/${cid}/${gid}`);
        const res = await axios.get(`/api/client/defaultgroups/${cid}`);
        if (res) {
            dispatch({
                type: SET_DEFAULT_GROUPS,
                payload: res.data,
            });
        } else {
            console.log('NO DEFAULT GROUPS RETURNED');
        }

        dispatch(setAlert('Default Group Removed', 'success'));
    } catch (err) {
        console.log('actions/admin.js removeDefGroup ADMIN_ERROR');
        dispatch({
            type: ADMIN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
export const deleteDefGroup = (id) => async (dispatch) => {
    //this removes the defGroup id from client
    //reference in database and updates meeter.defaultGroups
};
export const deleteClientUser = (cid, uid) => async (dispatch) => {
    //this removes the user id from client users
    // in database and removes from meeter.clientUsers
    try {
        await axios.delete(`/api/client/user/${cid}/${uid}`);

        dispatch({
            type: REMOVE_CLIENT_USER,
            payload: uid,
        });

        dispatch(setAlert('User Removed', 'success'));
    } catch (err) {
        console.log('actions/admin.js deleteClientUser ADMIN_ERROR');
        dispatch({
            type: ADMIN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
export const updateMeetingConfigs = (
    formData,
    history,
    cid,
    edit = false
) => async (dispatch) => {
    // console.table(formData);

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const res = await axios.put(
        `/api/client/updateconfigs/${cid}`,
        formData,
        config
    );
    dispatch(setAlert('Would have saved the values.', 'success'));
};
export const approveClientUser = (id) => async (dispatch) => {
    //this updates the status of the user (id) in client
    //users in database to approved and updates
    //meeter.clientUsers status
};
export const suspendClientUser = (id) => async (dispatch) => {
    //this updates the status of the user (id) in client
    //users in database to suspended and updates
    //meeter.clientUsers status
};
export const toggleConfig = (config, value, cid) => async (dispatch) => {
    // this gets the client and configuration value
    // if the value exists, we remove it, if it does
    // not exist, we add it.
    let theChange = {};
    theChange.cid = cid;
    theChange.config = config;
    theChange.value = value;
    // console.table(theChange);
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await axios.post(
            '/api/client/toggleconfig',
            theChange,
            config
        );

        dispatch({
            type: TOGGLE_CONFIG,
            payload: res,
        });

        dispatch(setAlert('System Configuration Updated', 'success'));
    } catch (err) {
        console.log('actions/admin.js deleteClientUser ADMIN_ERROR');
        dispatch({
            type: ADMIN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
