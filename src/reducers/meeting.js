import {
    SET_MEETING,
    CLEAR_MEETING,
    SET_GROUPS,
    CLEAR_GROUPS,
    SET_TMP_GROUP,
    CLEAR_TMP_GROUP,
} from '../actions/types';

const initialState = {
    turnout: [],
    groups: [],
    tmpGroup: {},
    meetingLoading: true,
    tmpGroupLoading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_MEETING:
            return {
                ...state,
                turnout: payload,
                meetingLoading: false,
            };
        case SET_GROUPS:
            return {
                ...state,
                groups: payload,
                meetingLoading: false,
            };
        case CLEAR_MEETING:
            return {
                ...state,
                turnout: null,
                groups: null,
                meetingLoading: true,
            };
        case CLEAR_GROUPS:
            return {
                ...state,
                groups: null,
                meetingLoading: false,
            };
        case SET_TMP_GROUP:
            return {
                ...state,
                tmpGroup: payload,
                tmpGroupLoading: false,
            };
        case CLEAR_TMP_GROUP:
            return {
                ...state,
                tmpGroup: null,
                tmpGroupLoading: true,
            };
        default:
            return state;
    }
}
