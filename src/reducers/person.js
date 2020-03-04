import {
    GET_PEOPLE,
    PERSON_ERROR,
    GET_PERSON,
    DELETE_PERSON
} from '../actions/types';

const initialState = {
    people: [],
    person: null,
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PEOPLE:
            return {
                ...state,
                people: payload,
                loading: false
            };
        case GET_PERSON:
            return {
                ...state,
                person: payload,
                loading: false
            };
        case DELETE_PERSON:
            return {
                ...state,
                people: state.people.filter(person => person._id !== payload)
            };
        case PERSON_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
