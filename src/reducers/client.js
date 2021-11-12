import {
    SET_CLIENT,
    REMOVE_DEFAULT_GROUP,
    CLEAR_CLIENT,
} from '../actions/types';

const initialState = {
    clientId: null,
    clientName: null,
    clientCode: null,
    defaultGroups: [],
    clientUsers: [],
    clientConfigs: [],
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_CLIENT:
            //payload will be array of Items, but only using the first element
            let client = payload.Items[0];
            
            return {
                ...state,
                clientId: client.clientId,
                clientName: client.clientName,
                clientCode: client.clientCode,
                defaultGroups: client.defaultGroups,
                clientUsers: client.clientUsers,
                clientConfigs: client.clientConfigs,
            };
        case REMOVE_DEFAULT_GROUP:
            console.log('REMOVE_DEFAULT_GROUP in client reducer');
            console.log('payload request value: ' + payload);
            return {
                ...state,
                defaultGroups: state.defaultGroups.filter((group) => group.groupId != payload),
            };  
        case CLEAR_CLIENT:
            return {
                ...state,
                tclientId: null,
                clientName: null,
                clientCode: null,
                defaultGroups: [],
                clientUsers: [],
                clientConfigs: [],
            };
        default:
            return state;
    }
}
