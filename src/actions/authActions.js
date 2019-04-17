import { SubmissionError } from 'redux-form';

import { firebaseAuth, db } from '../../firebase';
import { UPDATE_STRIPE_INFO } from './paymentActions';
import { persistor } from '../store';
import {
    sanitizeAndValidateName,
    sanitizeAndValidateEmail,
    sanitizeAndValidatePhoneNumber
} from '../utils/security';

export const AUTH_CHANGED = 'auth_changed';
export const SIGNUP_REQUEST = 'signup_request';
export const SIGNUP_SUCCESS = 'signup_success';
export const SIGNUP_FAIL = 'signup_fail';
export const SIGNIN_REQUEST = 'signin_request';
export const SIGNIN_SUCCESS = 'signin_success';
export const SIGNIN_FAIL = 'signin_fail';
export const SIGNOUT_REQUEST = 'signout_request';
export const SIGNOUT_SUCCESS = 'signout_success';
export const SIGNOUT_FAIL = 'signout_fail';
export const USER_READABLE_SUCCESS = 'user_readable_success';
export const USER_READABLE_ERROR = 'user_readable_fail';
export const SET_EXPO_PUSH_TOKEN_REQUEST = 'set_expo_push_token_request';

export const createUserWithEmailAndPassword = (values, dispatch) =>
    new Promise((resolve, reject) => {
        const { firstName, lastName, email, password, phoneNumber } = values;
        const safeFirstName = sanitizeAndValidateName(firstName);
        const safeLastName = sanitizeAndValidateName(lastName);
        const safeEmail = sanitizeAndValidateEmail(email);
        const safePhoneNumber = sanitizeAndValidatePhoneNumber(phoneNumber);
        dispatch({
            type: SIGNUP_REQUEST
        });
        return firebaseAuth
            .createUserWithEmailAndPassword(safeEmail, password)
            .then(userCredential =>
                db
                    .collection('users')
                    .doc(`${userCredential.user.uid}`)
                    .set({
                        firstName: safeFirstName,
                        lastName: safeLastName,
                        email: safeEmail,
                        phoneNumber: safePhoneNumber
                    })
            )
            .then(() => {
                dispatch({
                    type: SIGNUP_SUCCESS,
                    payload: {
                        firstName: safeFirstName,
                        lastName: safeLastName,
                        email: safeEmail,
                        phoneNumber: safePhoneNumber
                    }
                });
                return resolve();
            })
            .catch(error => {
                dispatch({
                    type: SIGNUP_FAIL,
                    payload: error
                });
                return reject(
                    new SubmissionError({
                        _error: 'Authentication error'
                    })
                );
            });
    });

export const signInWithEmailAndPassword = (values, dispatch) =>
    new Promise((resolve, reject) => {
        const { email, password } = values;
        const safeEmail = sanitizeAndValidateEmail(email);
        dispatch({
            type: SIGNIN_REQUEST
        });
        return firebaseAuth
            .signInWithEmailAndPassword(safeEmail, password)
            .then(() => {
                dispatch({
                    type: SIGNIN_SUCCESS
                });
                return resolve();
            })
            .catch(error => {
                dispatch({
                    type: SIGNIN_FAIL,
                    payload: error
                });
                return reject(
                    new SubmissionError({
                        _error: 'Invalid username or password'
                    })
                );
            });
    });

export const signOut = () => async dispatch => {
    try {
        dispatch({ type: SIGNOUT_REQUEST });
        persistor.purge();
        const result = await firebaseAuth.signOut();
        dispatch({ type: SIGNOUT_SUCCESS });
        return result;
    } catch (error) {
        dispatch({ type: SIGNOUT_FAIL, error });
        throw error;
    }
};

export const listenToAuthChanges = () => dispatch => {
    firebaseAuth.onAuthStateChanged(user => {
        dispatch({ type: AUTH_CHANGED, payload: user });
        if (user) {
            getUserReadable()(dispatch);
            dispatch({ type: SIGNIN_SUCCESS });
        } else {
            dispatch({ type: SIGNOUT_SUCCESS });
        }
    });
};

export const setUserExpoPushToken = token => dispatch => {
    if (firebaseAuth.currentUser) {
        const user = firebaseAuth.currentUser;
        dispatch({ type: SET_EXPO_PUSH_TOKEN_REQUEST }); // TODO: NOT LISTENED TO
        const userDoc = db.collection('users').doc(user.uid);
        return userDoc.update({ expoPushToken: token });
    }
};

export const getUserReadable = () => dispatch => {
    if (firebaseAuth.currentUser) {
        return db
            .collection('userReadable')
            .doc(firebaseAuth.currentUser.uid)
            .get()
            .then(snap => {
                const userData = snap.data();
                if (userData) {
                    dispatch({
                        type: USER_READABLE_SUCCESS,
                        payload: userData
                    });
                }
                if (
                    userData &&
                    userData.stripeInfo &&
                    userData.stripeInfo.stripeCustomerId
                ) {
                    dispatch({
                        type: UPDATE_STRIPE_INFO,
                        payload: userData.stripeInfo
                    });
                }
            })
            .catch(error =>
                dispatch({
                    type: USER_READABLE_ERROR,
                    payload: error
                })
            );
    }
};
