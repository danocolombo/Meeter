import {
    SET_GROUPS,
    // GET_GROUPS,
    GROUP_ERROR,
    DELETE_GROUP,
    // DELETE_GROUPS,
    // ADD_GROUP,
    GET_GROUP,
    CLEAR_GROUP,
} from '../actions/types';

const initialState = {
    groups: [],
    group: null,
    // loading: true,
    groupLoading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        // case GET_GROUPS:
        //     return {
        //         ...state,
        //         group: null,
        //         groups: payload,
        //         groupLoading: false,
        //     };
        case GET_GROUP:
            return {
                ...state,
                group: payload,
                groupLoading: false,
            };
        // case ADD_GROUP:
        //     return {
        //         ...state,
        //         groups: [payload, ...state.groups],
        //         groupLoading: false,
        //     };
        case CLEAR_GROUP:
            return {
                ...state,
                group: null,
                groupLoading: false,
            };
        // case DELETE_GROUPS:
        //     return {
        //         ...state,
        //         // groups: state.groups.filter((group) => group.id !== payload),
        //         groupLoading: false,
        //     };   
        case DELETE_GROUP:
            return {
                ...state,
                groups: state.groups.filter((group) => group.id !== payload),
                groupLoading: false,
            };
        case GROUP_ERROR:
            //reducers:group
            return {
                ...state,
                error: payload,
                groupLoading: false,
            };
        
        // case CLEAR_GROUPS:
        //     return {
        //         ...state,
        //         groups: null,
        //         groupLoading: false,
        //     };

        default:
            return state;
    }
}
