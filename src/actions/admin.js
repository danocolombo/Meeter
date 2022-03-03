import axios from 'axios';
import { setAlert } from './alert';
import { randomBytes, createCipheriv } from 'crypto';
import {
    SET_CLIENT_USERS,
    ADMIN_ERROR,
    ADD_DEFAULT_GROUP,
    REMOVE_CLIENT_USER,
    SET_DEFAULT_GROUPS,
    UPDATE_CLIENT_USER,
    UPDATE_DEFAULT_GROUP,
    UPDATE_MTG_CONFIGS,
} from './types';
import { ContactsOutlined } from '@material-ui/icons';

// GET CLIENT INFO

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
    console.log('getClientUsers(' + client + ')');
    console.log('/api/client/userstatus/' + client);
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
export const removeDefaultGroup = (clientId, groupId) => async (dispatch) => {
    //remove from database
    let deleteRequest = {};
    deleteRequest.clientId = clientId;
    deleteRequest.groupId = groupId;
    try {
        const config = {
            headers: {
                'Access-Control-Allow-Headers':
                    'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                'Content-Type': 'application/json',
            },
        };
        let obj = {
            operation: 'removeDefaultGroup',
            payload: deleteRequest,
        };

        let body = JSON.stringify(obj);

        let api2use = process.env.REACT_APP_MEETER_API + '/clients';
        let res = await axios.post(api2use, body, config);

        if (res.status === 200) {
            dispatch({
                type: 'REMOVE_DEFAULT_GROUP',
                payload: groupId,
            });
            dispatch(setAlert('client updated', 'success'));
        }
    } catch (err) {
        dispatch({
            type: ADMIN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const getDefGroups = (cid) => async (dispatch) => {
    //this loads all the default groups for cid
    //into meeter.defaultGroups
    console.log('getDefGroups(' + cid + ')');
    console.log('/api/client/defaultgroups/' + cid);
    try {
        const res = await axios.get(`/api/client/defaultgroups/${cid}`);
        if (res) {
            dispatch({
                type: SET_DEFAULT_GROUPS,
                payload: res.data,
            });
        } else {
            console.log('NO DEFAULT GROUPS RETURNED');
        }
    } catch (err) {
        console.log('actions/admin.js getDefGroups ADMIN_ERROR');
        dispatch({
            type: ADMIN_ERROR,
            // payload: {
            //     msg: err.response.statusText ? err.response.statusText : '',
            //     status: err.response.status,
            // },
        });
    }
};
export const updateConfiguration =
    (config, clientId, clientCode) => async (dispatch) => {
        //send the new default group to AWS API
        try {
            const configHeader = {
                headers: {
                    'Access-Control-Allow-Headers':
                        'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                    'Content-Type': 'application/json',
                },
            };
            let obj = {
                operation: 'updateMeetingConfig',
                payload: {
                    client: clientCode,
                    clientId: clientId,
                    config: config.config,
                    value: config.newValue,
                    label: config.label,
                },
            };

            let body = JSON.stringify(obj);

            let api2use = process.env.REACT_APP_MEETER_API + '/clients';
            let res = await axios.post(api2use, body, configHeader);
            // console.log('res:' + JSON.stringify(res.data));
            if (res.status === 200) {
                //now update the redux store
                // 1. update configurations
                let updatedConfigurations =
                    res.data.body.Item.configurations.map((cfg) => {
                        return cfg.config === config.config
                            ? {
                                  config: config.config,
                                  setting: config.newValue,
                                  label: config.label,
                              }
                            : cfg;
                    });

                // 2. update configFlags
                let updatedConfigFlags = res.data.body.Item.configFlags;
                updatedConfigFlags[config.config] = config.newValue;
                let payload_data = {};
                payload_data.configs = updatedConfigurations;
                payload_data.flags = updatedConfigFlags;
                //update the config

                dispatch({
                    type: UPDATE_MTG_CONFIGS,
                    payload: payload_data,
                });
                dispatch(setAlert('client updated', 'success'));
            }
        } catch (err) {
            dispatch({
                type: ADMIN_ERROR,
                payload: {
                    msg: err?.response,
                    status: err.response?.status,
                },
            });
        }
    };
export const addDefaultGroup = (clientId, request) => async (dispatch) => {
    // dispatch(setAlert('addDefaultGroup clicked', 'success'));
    // let groupId = randomBytes(16).toString('base64');
    let groupId = getUniqueId();
    //add default group to client entry in AWS dynamodb
    let newGroup = {};
    newGroup.clientId = clientId;
    newGroup.groupId = groupId;
    newGroup.gender = request.gender;
    newGroup.title = request.title;
    newGroup.facilitator = request.facilitator;
    newGroup.location = request.location;

    // newGroup.clientId = clientId;
    newGroup.groupId = groupId;

    //send the new default group to AWS API
    try {
        const config = {
            headers: {
                'Access-Control-Allow-Headers':
                    'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                'Content-Type': 'application/json',
            },
        };
        let obj = {
            operation: 'addNewDefaultGroup',
            payload: newGroup,
        };

        let body = JSON.stringify(obj);

        let api2use = process.env.REACT_APP_MEETER_API + '/clients';
        let res = await axios.post(api2use, body, config);
        // console.log('res:' + JSON.stringify(res.data));
        if (res.status === 200) {
            dispatch({
                type: ADD_DEFAULT_GROUP,
                payload: newGroup,
            });
            dispatch(setAlert('client updated', 'success'));
        }
    } catch (err) {
        dispatch({
            type: ADMIN_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const updateDefaultGroup =
    (clientId, updatedGroup) => async (dispatch) => {
        let newGroup = {};
        newGroup.clientId = clientId;
        newGroup.groupId = updatedGroup.groupId;
        newGroup.gender = updatedGroup.gender;
        newGroup.title = updatedGroup.title;
        newGroup.facilitator = updatedGroup.facilitator;
        newGroup.location = updatedGroup.location;
        try {
            const config = {
                headers: {
                    'Access-Control-Allow-Headers':
                        'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                    'Content-Type': 'application/json',
                },
            };
            let obj = {
                operation: 'updateDefaultGroup',
                payload: newGroup,
            };

            let body = JSON.stringify(obj);

            let api2use = process.env.REACT_APP_MEETER_API + '/clients';
            let res = await axios.post(api2use, body, config);
            // console.log('res:' + JSON.stringify(res.data));
            if (res.status === 200) {
                //take clientId out of group info
                delete newGroup.clientId;
                dispatch({
                    type: UPDATE_DEFAULT_GROUP,
                    payload: newGroup,
                });
                dispatch(setAlert('client updated', 'success'));
            }
        } catch (err) {
            dispatch({
                type: ADMIN_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    };
export const addUserToClient = (user) => async (dispatch) => {
    //==========================================
    // add user to client
    //==========================================
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    //=========================
    // get user from username
    //=========================
    try {
        const res = await axios.put(`/api/client/defaultgroup`, user, config);
        if (res === null) {
            console.log('res from put was null');
        }
        // now get the default groups and reload Redux
        const ress = await axios.get(`/api/client/defaultgroups/${user}`);
        if (ress === null) {
            console.log('ress from get was null');
        }
        dispatch({
            type: 'SET_DEFAULT_GROUPS',
            payload: ress.data,
        });
        dispatch(setAlert('Default Group Updated.', 'success'));
    } catch (err) {
        console.log('actions/admin.js updateDefaultGroup ADMIN_ERROR');
        dispatch(setAlert('Default Group Update Failed.', 'danger'));
    }
};
export const grantUserRegistration =
    (cid, id, role, email) => async (dispatch) => {
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
        // let res = null;
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

            let res = await axios.put(
                '/api/client/user',
                updateClientUser,
                config
            );
            if (res === null) {
                console.log('res is null');
            }
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
                if (peopleRef === null) {
                    console.log('peopleRef is null');
                }
            }
        } catch (err) {
            console.log(
                'actions/admin.js grantUserRegistration ADMIN_ERROR #1'
            );
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
            console.log(
                'actions/admin.js grantUserRegistration ADMIN_ERROR #2'
            );
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

export const deleteDefGroup = (groupId, clientInfo) => async (dispatch) => {
    //this removes the defGroup id from client
    //reference in database and updates meeter.defaultGroups
    dispatch({
        type: 'REMOVE_DEFAULT_GROUP',
        payload: groupId,
    });
    // now remove the group form the client object to send to AWS API
    let newClient = {
        ...clientInfo,
        defaultGroups: clientInfo.defaultGroups.filter(
            (group) => group.groupId !== groupId
        ),
    };
    // now wrap the newClient with Item
    const config = {
        headers: {
            'Access-Control-Allow-Headers':
                'Content-Type, x-auth-token, Access-Control-Allow-Headers',
            'Content-Type': 'application/json',
        },
    };
    let obj = {
        operation: 'updateClient',
        payload: {
            Item: newClient,
        },
    };
    let body = JSON.stringify(obj);
    // console.log('sending to /clients api\n\n' + body);
    let api2use = process.env.REACT_APP_MEETER_API + '/clients';
    let res = await axios.post(api2use, body, config);
    if (res === null) {
        console.log('res is null');
    }
    // console.log('\n\nRESPONSE FROM AWS API')
    // const util = require('util');
    // console.log('res:  \n' + util.inspect(res, { showHidden: false, depth: null }));
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
export const updateMeetingConfigs =
    (formData, history, cid, edit = false) =>
    async (dispatch) => {
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
        if (res === null) {
            console.log('res is null');
        }
        dispatch(setAlert('Would have saved the values.', 'success'));
    };
export const updateUserCredentials =
    (userUpdates, userHistory) => async (dispatch) => {
        // this will possibly do multiple udpates
        // the current values in clientUsers will drive actions necessary
        //---------------------------------------------------------------
        // if updates are not differnt than curent settings, return
        if (
            userHistory.role === userUpdates.role &&
            userHistory.status === userUpdates.status
        ) {
            // no updates to make = return
            return;
        }

        //  ----------------------------------------------
        //  old              | new         | action
        // -----------------------------------------------
        // role: undefined    | !undefined   | add user to mtrClient.users
        // status: undefined  |             | update mtrUser w/client
        //------------------------------------------------
        // role !undefined    | !undefined   | update role & status mtrClient
        //------------------------------------------------
        //   NEED TO ADD USER TO updateClientUser
        if (
            userHistory.role === 'undefined' &&
            userUpdates.role !== 'undefined'
        ) {
            // add user to client definitions
            try {
                const config = {
                    headers: {
                        'Access-Control-Allow-Headers':
                            'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                        'Content-Type': 'application/json',
                    },
                };
                let obj = {
                    operation: 'addClientUser',
                    payload: {
                        clientId: userUpdates.client,
                        userId: userUpdates.userId,
                        firstName: userUpdates.firstName,
                        lastName: userUpdates.lastName,
                        role: userUpdates.role,
                        status: userUpdates.status,
                    },
                };

                let body = JSON.stringify(obj);

                let api2use = process.env.REACT_APP_MEETER_API + '/clients';
                let res = await axios.post(api2use, body, config);

                if (res.status === 200) {
                    dispatch({
                        type: UPDATE_CLIENT_USER,
                        payload: {
                            firstName: userUpdates.firstName,
                            lastName: userUpdates.lastName,
                            role: userUpdates.role,
                            status: userUpdates.status,
                            userId: userUpdates.userId,
                        },
                    });
                    dispatch(setAlert('user credentials updated', 'success'));
                }
                //===========================================
            } catch (err) {
                console.log(err);
            }
            //==========================================
            // update the users default client
            //==========================================
            try {
                const config = {
                    headers: {
                        'Access-Control-Allow-Headers':
                            'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                        'Content-Type': 'application/json',
                    },
                };
                let obj = {
                    operation: 'updateDefaultClient',
                    payload: {
                        Item: {
                            userId: userUpdates.userId,
                            defaultClientId: userUpdates.clientId,
                            defaultClient: userUpdates.client,
                        },
                    },
                };

                let body = JSON.stringify(obj);

                let api2use = process.env.REACT_APP_MEETER_API + '/users';
                let res = await axios.post(api2use, body, config);
                if (res.status !== '200') {
                    console.log('error');
                }
                //===========================================
            } catch (err) {
                console.log(err);
            }
        } else {
            //================================================
            //   JUST UPDATE USER ROLE & STATUS IN mtrClients
            //================================================
            try {
                const config = {
                    headers: {
                        'Access-Control-Allow-Headers':
                            'Content-Type, x-auth-token, Access-Control-Allow-Headers',
                        'Content-Type': 'application/json',
                    },
                };
                let obj = {
                    operation: 'updateUserAuth',
                    payload: {
                        client: userUpdates.client,
                        userId: userUpdates.userId,
                        role: userUpdates.role,
                        status: userUpdates.status,
                    },
                };

                let body = JSON.stringify(obj);

                let api2use = process.env.REACT_APP_MEETER_API + '/clients';
                let res = await axios.post(api2use, body, config);
                console.log('\nres:\n', res, '\n');
                if (res.status === 200) {
                }
                //===========================================
                if (res.status === 200) {
                    dispatch({
                        type: UPDATE_CLIENT_USER,
                        payload: {
                            firstName: userUpdates.firstName,
                            lastName: userUpdates.lastName,
                            role: userUpdates.role,
                            status: userUpdates.status,
                            userId: userUpdates.userId,
                        },
                    });
                    dispatch(setAlert('user credentials updated', 'success'));
                }
            } catch (err) {
                console.log(err);
            }
        }
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

function getUniqueId() {
    //this generates a unique ID based on this specific time
    // Difining algorithm
    // const algorithm = 'aes-256-cbc';
    // Defining key
    const key = randomBytes(32);
    // Defining iv
    const iv = randomBytes(16);
    let cipher = createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    //get the current time...
    let n = Date.now();
    let encrypted = cipher.update(n.toString());
    // Using concatenation
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}
