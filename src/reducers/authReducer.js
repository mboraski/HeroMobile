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
    LOGIN_FACEBOOK_FAIL,
    CONTRACTOR_APPROVED,
    ONLINE,
    OFFLINE
} from '../actions/authActions';

export const initialState = {
    user: null,
    approved: false,
    pending: false,
    error: null,
    connectId: '',
    online: false
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
                          .add(1, 'months')
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
        case CONTRACTOR_APPROVED:
            return {
                ...state,
                // connectId: action.payload,
                approved: true,
                pending: false
            };
        case ONLINE:
            return {
                ...state,
                online: true
            };
        case OFFLINE:
            return {
                ...state,
                online: false
            };
        default:
            return state;
    }
}
