import {
    SET_MEETING,
    CLEAR_MEETING,
    SET_GROUPS,
    CLEAR_GROUPS,
    REMOVE_GROUP,
    TURN_MEEETINGLOADING_OFF,
    
    
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
        case SET_GROUPS:
            state = {
                ...state,
                groups: payload.sort((a,b) => (a.gender > b.gender) ? 1 : ((b.gender > a.gender) ? -1 : 0)),
                meetingsLoading: false
            }
            return state;
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
        default:
            return state;
    }
}
