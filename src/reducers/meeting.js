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
    tmpGroupReady: false,
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
                tmpGroupReady: false,
                tmpGroup: null,
            };
        case CLEAR_MEETING:
            return {
                ...state,
                turnout: null,
                groups: null,
                tmpGroup: null,
                meetingLoading: true,
                tmpGroupReady: false,
            };
        case CLEAR_GROUPS:
            return {
                ...state,
                groups: null,
                meetingLoading: false,
                tmpGroup: null,
                tmpGroupReady: false,
            };
        case SET_TMP_GROUP:
            return {
                ...state,
                tmpGroup: payload,
                tmpGroupReady: true,
            };
        // case SET_TMP_GROUP_FULL:
        //     return {
        //         ...state,
        //         tmpGroup: {
        //             id: payload.id,
        //             clientId: payload.clientId,
        //             meetingId: payload.meetingId,
        //             location: payload.location,
        //             gender: payload.gender,
        //             facilitator: payload.facilitator,
        //             cofacilitator: payload.coFacilitator,
        //             title: payload.title,
        //         },
        //         tmpGroupLoaded: true,
        //     };
        case CLEAR_TMP_GROUP:
            return {
                ...state,
                tmpGroup: null,
                tmpGroupReady: false,
            };
        default:
            return state;
    }
}
