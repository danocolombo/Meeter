import {
    // GET_GROUPS,
    GROUP_ERROR,
    // DELETE_GROUP,
    // DELETE_GROUPS,
    // ADD_GROUP,
    GET_GROUP,
    SET_TMP_GROUP,
    CLEAR_TMP_GROUP,
    CLEAR_GROUP,
} from '../actions/types';

const initialState = {
    // groups: [],
    tmpGroup: null,
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
                groupLoading: false
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
                tmpGroup: null,
                groupLoading: false,
            };
        // case DELETE_GROUPS:
        //     return {
        //         ...state,
        //         // groups: state.groups.filter((group) => group.id !== payload),
        //         groupLoading: false,
        //     };   
        // case DELETE_GROUP:
        //     return {
        //         ...state,
        //         groups: state.groups.filter((group) => group.id !== payload),
        //         groupLoading: false,
        //     };
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
