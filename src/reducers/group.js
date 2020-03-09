import {
    GET_GROUPS,
    GROUP_ERROR,
    CLEAR_GROUPS,
    CLEAR_GROUP,
    GET_GROUP,
    DELETE_GROUP
} from '../actions/types';

const initialState = {
    groups: [],
    group: null,
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GROUP_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case GET_GROUPS:
            return {
                ...state,
                groups: payload,
                loading: false
            };
        case CLEAR_GROUPS:
            return {
                ...state,
                groups: null,
                loading: false
            };
        case CLEAR_GROUP:
            return {
                ...state,
                group: null,
                loading: false
            };
        case GET_GROUP:
            return {
                ...state,
                group: payload,
                loading: false
            };
        case DELETE_GROUP:
            return {
                ...state,
                groups: state.groups.filter(group => group._id !== payload),
                loading: false
            };
        default:
            return false;
    }
}
