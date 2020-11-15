import {
    REGISTER_SUCCESS,
    //REGISTER_FAIL,
    USER_LOADED,
    SET_AUTH_ACTIVE,
    //AUTH_ERROR,
    LOGIN_SUCCESS,
    //LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED,
    SET_PROFILE,
    AUTH_CLEAR,
} from '../actions/types';

const initialState = {
    // token: localStorage.getItem('token'),
    token: null,
    isAuthenticated: null,
    loading: true,
    activeClient: 'undefined',
    activeRole: 'guest',
    activeStatus: 'undefined',
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                // user: payload
            };
        case REGISTER_SUCCESS:
        case SET_PROFILE:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case SET_AUTH_ACTIVE:
            return {
                ...state,
                ...payload,
                activeStatus: payload.activeStatus,
                activeRole: payload.role,
                activeClient: payload.activeClient,
                loading: false,
            };
        case ACCOUNT_DELETED:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        case AUTH_CLEAR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        default:
            return state;
    }
}
