import {
    GET_GATHERINGS,
    GATHERING_ERROR,
    GET_GATHERING,
    CLEAR_GATHERINGS,
    CLEAR_GATHERING,
    DELETE_GATHERING,
    GET_SERVANTS,
    CLEAR_SERVANTS
} from '../actions/types';

const initialState = {
    gatherings: [],
    gathering: null,
    servants: [],
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_GATHERINGS:
            return {
                ...state,
                gatherings: payload,
                loading: false
            };
        case GET_GATHERING:
            return {
                ...state,
                gathering: payload,
                loading: false
            };
        case GET_SERVANTS:
            return {
                ...state,
                servants: payload,
                loading: false
            };
        case GATHERING_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case CLEAR_GATHERING:
            return {
                ...state,
                gathering: null,
                loading: false
            };
        case CLEAR_SERVANTS:
            return {
                ...state,
                servants: null,
                loading: false
            };
        case CLEAR_GATHERINGS:
            return {
                ...state,
                gatherings: [],
                loading: false
            };
        case DELETE_GATHERING:
            return {
                ...state,
                gatherings: state.gatherings.filter(
                    gathering => gathering._id !== payload
                ),
                loading: false
            };
        default:
            return state;
    }
}
