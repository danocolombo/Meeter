import {
    SET_MEETING,
    CLEAR_MEETING,
    SET_GROUPS,
    ADD_GROUP,
    CLEAR_GROUPS,
    REMOVE_GROUP,
} from '../actions/types';

const initialState = {
    turnout: [],
    groups: [],
    meetingLoading: true,
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
        case ADD_GROUP:
            return {
                ...state,
                groups: [payload, ...state.groups],
                groupLoading: false,
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
        case REMOVE_GROUP:
            console.log('REMOVE_GROUP in meeting reducer');
            console.log('table: state.groups');
            console.table(state.groups);
            const util = require('util');
            console.log('payload:  \n' + util.inspect(payload, { showHidden: false, depth: null }));

            return {
                ...state,
                groups: state.groups.filter((group) => group.groupId !== payload.groupId),
                groupLoading: false,
            };
        default:
            return state;
    }
}
