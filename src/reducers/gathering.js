import {
    GET_GATHERINGS,
    GATHERING_ERROR,
    CLEAR_GATHERINGS,
    CLEAR_SERVANTS,
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
        // case GET_SERVANTS:
        //     //this inserts a blank row at the top of payload
        //     var newPayload = [];
        //     newPayload[0] = {
        //         _id: '',
        //         name: ' ',
        //         servant: '',
        //         __v: '0',
        //         date: '',
        //         training: '',
        //         email: '',
        //         phone: '',
        //         sysem: ''
        //     };
        //     payload.forEach(element => {
        //         newPayload.push(element);
        //     });

        //     return {
        //         ...state,
        //         servants: newPayload,
        //         loading: false
        //     };
        case GATHERING_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case CLEAR_SERVANTS:
            return {
                ...state,
                servants: null,
                loading: false,
            };
        case CLEAR_GATHERINGS:
            return {
                ...state,
                gatherings: [],
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
