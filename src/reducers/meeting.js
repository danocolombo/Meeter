import {
    SET_MEETING,
    CLEAR_MEETING,
    SET_GROUPS,
    ADD_GROUP,
    CLEAR_GROUPS,
    REMOVE_GROUP,
    TURN_MEEETINGLOADING_OFF,
    UPDATE_GROUP,
    MEETING_GROUP_INITIATE,
    MEETING_GROUP_UPDATE,
    MEETING_GROUP_INSERT
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
        case MEETING_GROUP_INSERT:
            console.log('MEETING_GROUP_INSERT');
            return state;
        case MEETING_GROUP_UPDATE:
            console.log('MEETING_GROUP_UPDATE');
            return state;
        case MEETING_GROUP_INITIATE:
            console.log('MEETING_GROUP_INITIATE');
            return {
                ...state,
                groups: payload,
                groupLoading: false,
            };

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
            // return {
            //     ...state,
            //     groups: [payload, ...state.groups],
            //     groupLoading: false,
            // };
        // case WAS_ADD_GROUP:
            console.log('reducter/meeting -ADD_GROUP');
            if (state.groups.length > 0) {
                // see if payload is existing
                let positive = false;
                for (let i = 0; i < state.groups.length; i++){
                    if (state.groups[i].groupId === payload.groupId){
                        positive = true;
                        i = state.groups.length;
                    }
                }
                // state.groups.map( g => {
                //     if (g.groupId === payload.groupId) {
                //         positive = true;
                //     }
                // });

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
                    // NOTE: this will overwrite all groups and only add payload
                    return {
                        ...state,
                        groups: {...state.groups, payload},
                        groupLoading: false,
                    } 
                }
                
                
            } else {
                console.log('reducter/meeting; ADD_GROUP, no existing values');
                return {
                    ...state,
                    groups: {payload},
                    groupLoading: false,
                }
            }
            // return {
            //     ...state,
            //     defaultGroups: [...state.defaultGroups, payload],
            // };
        case SET_GROUPS:
            console.log('999999999999999999999');
            console.log('inside meeting reducer / SET_GROUPS');
            console.log(JSON.stringify(payload));
            console.log('999999999999999999999');
            // if (state.groups.length > 1){
                state = {
                    ...state,
                    groups: payload.sort((a,b) => (a.gender > b.gender) ? 1 : ((b.gender > a.gender) ? -1 : 0)),
                    meetingsLoading: false
                }
            // }else{
            //     //cannot sort if just one value, so send back generic entry
            //     state = {
            //         ...state,
            //         groups: [payload],
            //         meetingsLoading: false
            //     }

            // }
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
