import {
    SET_CLIENT,
    REMOVE_DEFAULT_GROUP,
    UPDATE_DEFAULT_GROUP,
    ADD_DEFAULT_GROUP,
    ADD_CLIENT_USER,
    UPDATE_CLIENT_USER,
    CLEAR_CLIENT,
    SET_MTG_CONFIGS,
} from '../actions/types';

const initialState = {
    clientId: null,
    clientName: null,
    clientCode: null,
    defaultGroups: [],
    clientUsers: [],
    clientConfigs: [],
    configFlags: [],
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_CLIENT:
            //payload will be array of Items, but only using the first element
            // let client = payload.Items[0];

            return {
                ...state,
                clientId: payload?.clientId,
                clientName: payload?.clientName,
                clientCode: payload?.clientCode,
                defaultGroups: payload?.defaultGroups,
                clientUsers: payload?.clientUsers,
                clientConfigs: payload?.clientConfigs,
                configFlags: payload?.configFlags,
            };
        case ADD_CLIENT_USER:
            // this inserts the payload into the clientUsers array
            return {
                ...state,
                clientUsers: [...state.clientUsers, payload],
            };
        case UPDATE_CLIENT_USER:
            return {
                ...state,
                clientUsers: state.clientUsers.map((user) =>
                    user.userId === payload.userId ? payload : user
                ),
            };
        case REMOVE_DEFAULT_GROUP:
            return {
                ...state,
                defaultGroups: state.defaultGroups.filter(
                    (group) => group.groupId !== payload
                ),
            };
        case UPDATE_DEFAULT_GROUP:
            return {
                ...state,
                defaultGroups: state.defaultGroups.map((grp) =>
                    grp.groupId === payload.groupId ? payload : grp
                ),
            };

        case ADD_DEFAULT_GROUP:
            return {
                ...state,
                defaultGroups: [...state.defaultGroups, payload],
            };

        case SET_MTG_CONFIGS:
            return {
                ...state,
                clientConfigs: payload,
                loading: false,
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
