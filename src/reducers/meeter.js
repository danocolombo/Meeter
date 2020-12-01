import {
    SET_ACTIVES,
    CLEAR_ACTIVES,
    SET_CLIENT_USERS,
    CLEAR_CLIENT_USERS,
    SET_DEFAULT_GROUPS,
    REMOVE_CLIENT_USER,
    ADMIN_ERROR,
    SET_MTG_CONFIGS,
    TOGGLE_CONFIG,
} from '../actions/types';

const initialState = {
    active: [],
    clientUsers: [],
    clientUser: null,
    defaultGroups: [],
    mtgConfigs: [],
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_ACTIVES:
            return {
                ...state,
                active: payload,
                loading: false,
            };
        case CLEAR_ACTIVES:
            return {
                ...state,
                active: null,
                loading: false,
            };
        case SET_MTG_CONFIGS:
            return {
                ...state,
                mtgConfigs: payload,
                loading: false,
            };
        case SET_CLIENT_USERS:
            return {
                ...state,
                clientUsers: payload,
                loading: false,
            };
        case REMOVE_CLIENT_USER:
            return {
                ...state,
                clientUsers: state.clientUsers.filter(
                    (clientUser) => clientUser._id !== payload
                ),
                loading: false,
            };
        case CLEAR_CLIENT_USERS:
        case ADMIN_ERROR:
            return {
                ...state,
                clientUsers: [],
                defaultGroups: [],
                error: payload,
                loading: false,
            };
        case SET_DEFAULT_GROUPS:
            return {
                ...state,
                defaultGroups: payload,
                loading: false,
            };
        case TOGGLE_CONFIG:
            console.log('payload: ' + payload);
            return state;
        // return {
        //     ...state,
        //     mtgConfigs: state.mtgConfigs.filter(
        //         (mtgConfigs) => mtgConfigs.UNK !== payload
        //     ),
        //     loading: false,

        // };

        // case CLEAR_DEFAULT_GROUPS:
        //     return {
        //         ...state,
        //         defaultGroups: [],
        //         error: payload,
        //         loading: false,
        //     };
        default:
            return state;
    }
}
