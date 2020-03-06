import {
    GET_GATHERINGS,
    GATHERING_ERROR,
    GET_GATHERING,
    CLEAR_GATHERINGS,
    CLEAR_GATHERING,
    DELETE_GATHERING,
    GET_SERVANTS,
    CLEAR_SERVANTS,
    GET_HATHERINGS,
    CLEAR_HATHERINGS
} from '../actions/types';

const initialState = {
    gatherings: [],
    hatherings: [],
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
        case GET_HATHERINGS:
            return {
                ...state,
                hatherings: payload,
                loading: false
            };
        case GET_GATHERING:
            return {
                ...state,
                gathering: payload,
                loading: false
            };
        case GET_SERVANTS:
            //this inserts a blank row at the top of payload
            var newPayload = [];
            newPayload[0] = {"_id":"","name":" ","servant":"","__v": "0","date":"","training":"","email": "", "phone": "", "sysem":""};
            payload.forEach(element => {
                newPayload.push(element);
            });
            
            return {
                ...state,
                servants: newPayload,
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
        case CLEAR_HATHERINGS:
            return {
                ...state,
                hatherings: [],
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
