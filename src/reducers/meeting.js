import {
    SET_MEETING,
    CLEAR_MEETING,
    SET_GROUPS,
    CLEAR_GROUPS,
} from '../actions/types';

const initialState = {
    turnout: [],
    groups: [],
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_MEETING:
            return {
                ...state,
                turnout: payload,
                loading: false,
            };
        case SET_GROUPS:
            return {
                ...state,
                groups: payload,
                loading: false,
            };
        case CLEAR_MEETING:
            return {
                ...state,
                turnout: null,
                loading: false,
            };
        case CLEAR_GROUPS:
            return {
                ...state,
                groups: null,
                loading: false,
            };
        default:
            return state;
    }
}
