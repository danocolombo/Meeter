import {
    GROUP_ERROR,
    GET_GROUP,
    SET_TMP_GROUP,
    CLEAR_TMP_GROUP,
    CLEAR_GROUP,
} from '../actions/types';

const initialState = {
    tmpGroup: null,
    groupLoading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_GROUP:
            return {
                ...state,
                tmpGroup: payload,
                groupLoading: false,
            };
        case SET_TMP_GROUP:
            return {
                ...state,
                tmpGroup: payload,
                groupLoading: true,
            };
        case CLEAR_TMP_GROUP:
            return {
                ...state,
                tmpGroup: null,
                groupLoading: false,
            };
        case CLEAR_GROUP:
            return {
                ...state,
                tmpGroup: null,
                groupLoading: false,
            };
        case GROUP_ERROR:
            return {
                ...state,
                error: payload,
                groupLoading: false,
            };
        default:
            return state;
    }
}
