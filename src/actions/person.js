import axios from 'axios';
import { setAlert } from './alert';
import { GET_PEOPLE, PERSON_ERROR, GET_PERSON } from './types';

export const getPeople = () => async dispatch => {
    try {
        const res = await axios.get('/api/person');
        dispatch({
            type: GET_PEOPLE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PERSON_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};
export const getPerson = () => async dispatch => {
    try {
        const res = await axios.get('/api/person/');
        dispatch({
            type: GET_PERSON,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PERSON_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};
// Create or update a person
export const createPerson = (
    formData,
    history,
    edit = false
) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        console.log('in action/createPerson');
        const res = await axios.post('/api/person', formData, config);

        dispatch({
            type: GET_PERSON,
            payload: res.data
        });

        dispatch(
            setAlert(edit ? 'Person Updated' : 'Person Created', 'success')
        );

        if (!edit) {
            history.push('/people');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PERSON_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};
