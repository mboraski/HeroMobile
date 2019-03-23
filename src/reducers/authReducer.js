import moment from 'moment';

import {
    FACEBOOK_LOGIN_REQUEST,
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_ERROR,
    GOOGLE_LOGIN_REQUEST,
    GOOGLE_LOGIN_SUCCESS,
    GOOGLE_LOGIN_ERROR,
    AUTH_CHANGED,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,
    SIGNOUT_REQUEST,
    SIGNOUT_SUCCESS,
    SIGNOUT_FAIL,
    USER_READABLE_SUCCESS,
    UPDATE_SIGNIN_DELAY,
    AUTH_NO_LOADED
} from '../actions/authActions';

const initialState = {
    user: null,
    userReadable: {
        firstName: '',
        lastName: '',
        email: '',
        photoUrl: ''
    },
    pending: false,
    error: null,
    expirationDate: null,
    signInDelay: 0,
    facebookAuthToken: '',
    facebookAuthExpires: '',
    googleIdToken: '',
    googleAccessToken: '',
    googleRefreshToken: '',
    loaded: false
};

export default function(state = initialState, action) {
    const payload = action.payload;

    switch (action.type) {
        case FACEBOOK_LOGIN_REQUEST:
            return {
                ...state,
                pending: true
            };
        case FACEBOOK_LOGIN_SUCCESS:
            return {
                ...state,
                facebookAuthToken: payload.token,
                facebookAuthExpires: payload.expires,
                pending: false
            };
        case FACEBOOK_LOGIN_ERROR:
            return {
                ...state,
                error: 'facebook login error',
                pending: false
            };
        case GOOGLE_LOGIN_REQUEST:
            return {
                ...state,
                pending: true
            };
        case GOOGLE_LOGIN_SUCCESS:
            return {
                ...state,
                googleIdToken: payload.token,
                googleAccessToken: payload.accessToken,
                googleRefreshToken: payload.refreshToken,
                pending: false
            };
        case GOOGLE_LOGIN_ERROR:
            return {
                ...state,
                error: 'google login error',
                pending: false
            };
        case AUTH_CHANGED:
            return {
                ...state,
                user: payload ? { uid: payload.uid } : null,
                loaded: true,
                expirationDate: payload // Assumes firebase returns no payload if not authenticated
                    ? moment()
                          .add(1, 'months')
                          .toDate()
                    : null
            };
        case AUTH_NO_LOADED:
            return { ...state, loaded: false };
        case SIGNUP_REQUEST:
            return { ...state, pending: true };
        case SIGNUP_SUCCESS:
            return { ...state, userReadable: payload, pending: false };
        case SIGNUP_FAIL:
            return { ...state, pending: false, error: payload };
        case SIGNIN_REQUEST:
            return { ...state, pending: true };
        case SIGNIN_SUCCESS:
            return { ...state, pending: false, loaded: true };
        case SIGNIN_FAIL:
            return { ...state, pending: false, error: payload };
        case SIGNOUT_REQUEST:
            return { ...state, pending: true };
        case SIGNOUT_SUCCESS:
            return { ...initialState, loaded: true };
        case SIGNOUT_FAIL:
            return { ...state, error: payload, pending: false };
        case USER_READABLE_SUCCESS:
            return { ...state, userReadable: payload };
        case UPDATE_SIGNIN_DELAY: {
            const newValue = calculateSignInDelay(payload);
            return { ...state, signInDelay: newValue };
        }
        default:
            return state;
    }
}
