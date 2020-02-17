import axios from 'axios';
import { setAlert } from './alert';
import { GET_PEOPLE, PERSON_ERROR } from './types';

export const getPeople = () => async dispatch => {
  try {
    const res = await axios.get('/api/person/all');
    dispatch({
      type: GET_PEOPLE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PERSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
