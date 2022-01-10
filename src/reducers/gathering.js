import {
    GET_GATHERINGS,
    GATHERING_ERROR,
    GET_HATHERINGS,
    CLEAR_HATHERINGS,
    DELETE_GATHERING,
    DELETE_HATHERING,
} from '../actions/types';

const initialState = {
    gatherings: [],
    hatherings: [],
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_GATHERINGS:
            return {
                ...state,
                gatherings: payload,
                loading: false,
            };
        case GET_HATHERINGS:
            return {
                ...state,
                hatherings: payload,
                loading: false,
            };
        case DELETE_GATHERING:
            return {
                ...state,
                gatherings: state.gatherings.filter((gathering) => gathering.meetingId !== payload),
                loading: false,
            };
        case DELETE_HATHERING:
            return {
                ...state,
                hatherings: state.hatherings.filter((hathering) => hathering.meetingId !== payload),
                loading: false,
            };
        case GATHERING_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case CLEAR_HATHERINGS:
            return {
                ...state,
                hatherings: [],
                loading: false,
            };
        default:
            return state;
    }
}
