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
            if (state.groups.length > 0) {
                // see if payload is existing
                let positive = false;
                state.groups.map( g => {
                    if (g.groupId == payload.groupId) {
                        positive = true;
                    }
                });
                if (positive) {
                    //need to update exising redux
                    return {
                        ...state,
                        groups: state.groups.map(g =>
                          g.groupId === payload.groupId ? payload : g
                        ),
                        loading: false
                      };
                }else{
                    // group just needs to be added to redux array
                    return {
                        ...state,
                        groups: [...state.groups, payload],
                        groupLoading: false,
                    } 
                }
                
                
            } else {
                return {
                    ...state,
                    groups: payload,
                    groupLoading: false,
                }
            }
            return {
                ...state,
                defaultGroups: [...state.defaultGroups, payload],
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
