import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_PEOPLE,
    PERSON_ERROR,
    CLEAR_PERSON,
    GET_PERSON,
    DELETE_PERSON
} from './types';

export const getPeople = () => async dispatch => {
    try {
        //we know that this is called when the people list is created.
        //for this reason. Clear out the temporary person value.
        dispatch({ type: CLEAR_PERSON });
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
// getCurrentPerson is used when editting a person, need to get it, to edit it.DeleteTarget
export const getCurrentPerson = id => async dispatch => {
    try {
        dispatch({ CLEAR_PERSON });
        const res = await axios.get(`/api/person/${id}`);
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

export const getPerson = id => async dispatch => {
    if (id.length < 1) return;
    if (id === 0) return;
    try {
        const res = await axios.get(`/api/person/${id}`);
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
// Delete PERSON
export const deletePerson = id => async dispatch => {
    try {
        await axios.delete(`/api/person/${id}`);

        dispatch({
            type: DELETE_PERSON,
            payload: id
        });
        dispatch(setAlert('Person Removed', 'success'));
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
export const editPerson = id => async dispatch => {
    try {
        //something
        dispatch({ CLEAR_PERSON });
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
