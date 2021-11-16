import {
    SET_MEETING,
    CLEAR_MEETING,
    SET_GROUPS,
    ADD_GROUP,
    CLEAR_GROUPS,
    REMOVE_GROUP,
    TURN_MEEETINGLOADING_OFF,
    UPDATE_GROUP,
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
        case TURN_MEEETINGLOADING_OFF:
            return {
                ...state,
                meetingLoading: false,
            };
        case SET_MEETING:
            return {
                ...state,
                turnout: payload,
                meetingLoading: false,
            };
        case ADD_GROUP:
            console.log('length of groups: ' + state.groups.length);
            if (state.groups.length > 0) {
                return {
                    ...state,
                    groups: [payload, ...state.groups],
                    groupLoading: false,
                } 
            } else {
                return {
                    ...state,
                    groups: payload,
                    groupLoading: false,
                }
            }
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
            return {
                ...state,
                groups: state.groups.filter((group) => group.groupId !== payload),
                groupLoading: false,
            };
        case UPDATE_GROUP:
            return {
                ...state,
                groups: state.groups.map((group) => 
                    group.groupId === payload.groupId ? payload : group
                ),
            }     
        default:
            return state;
    }
}
