import {
    SET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    PROFILE_CLEAR,
} from '../actions/types';

const initialState = {
    settings: null,
    // profiles: [],
    // repos: [],
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                settings: payload,
                loading: false,
            };
        // case GET_PROFILES:
        // 	return {
        // 		...state,
        // 		profiles: payload,
        // 		loading: false
        // 	};
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                settings: null,
            };
        case CLEAR_PROFILE:
        case PROFILE_CLEAR:
            return {
                ...state,
                settings: null,
                loading: false,
            };
        // case GET_REPOS:
        // 	return {
        // 		...state,
        // 		repos: payload,
        // 		loading: false
        // 	};
        default:
            return state;
    }
}
