import moment from 'moment';

import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    SIGNOUT,
    SIGNOUT_SUCCESS,
    SIGNOUT_FAIL,
    AUTH_CHANGED,
    // UPDATE_ACCOUNT,
    // UPDATE_ACCOUNT_SUCCESS,
    // UPDATE_ACCOUNT_FAIL,
    LOGIN_FACEBOOK,
    LOGIN_FACEBOOK_SUCCESS,
    LOGIN_FACEBOOK_FAIL
} from '../actions/authActions';

export const initialState = {
    user: null,
    pending: false,
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
        case LOGIN_FACEBOOK:
        case SIGNUP:
        case SIGNOUT:
            return { ...state, pending: true };
        case LOGIN_SUCCESS:
        case LOGIN_FACEBOOK_SUCCESS:
        case SIGNUP_SUCCESS:
        case AUTH_CHANGED:
            return {
                ...state,
                user: action.payload,
                expirationDate: action.payload
                    ? moment()
                          .add(3, 'months')
                          .toDate()
                    : null
            };
        case LOGIN_FAIL:
        case LOGIN_FACEBOOK_FAIL:
        case SIGNUP_FAIL:
        case SIGNOUT_FAIL:
            return { ...state, error: action.error };
        case SIGNOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
}
