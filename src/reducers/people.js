import {
  PEOPLE_ERROR,
  CLEAR_PEOPLE,
  GET_PEOPLE,
  GET_PERSON
} from '../actions/types';

const initialState = {
  // person: null,
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
    case PEOPLE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PEOPLE:
      return {
        ...state,
        people: null,
        loading: false
      };
    default:
      return state;
  }
}
