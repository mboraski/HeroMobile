import { Facebook } from 'expo';
import firebase from 'firebase';
import { auth, firestore } from '../firebase';

import { APP_ID } from '../constants/Facebook';

export const LOGIN = 'login';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_FAIL = 'login_fail';
export const SIGNUP = 'signup';
export const SIGNUP_SUCCESS = 'signup_success';
export const SIGNUP_FAIL = 'signup_fail';
export const SIGNOUT = 'signup';
export const SIGNOUT_SUCCESS = 'signup_success';
export const SIGNOUT_FAIL = 'signup_fail';
export const REDIRECT_TO_SIGNUP = 'redirect_to_signup';
export const AUTH_CHANGED = 'auth_changed';
export const UPDATE_ACCOUNT = 'update_account';
export const UPDATE_ACCOUNT_SUCCESS = 'update_account_success';
export const UPDATE_ACCOUNT_FAIL = 'update_account_fail';
export const LOGIN_FACEBOOK = 'login_facebook';
export const LOGIN_FACEBOOK_SUCCESS = 'login_facebook_success';
export const LOGIN_FACEBOOK_FAIL = 'login_facebook_fail';

export const signInWithFacebook = () => async dispatch => {
    try {
        dispatch({ type: LOGIN_FACEBOOK });
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            APP_ID,
            {
                permissions: ['public_profile', 'email', 'user_friends']
            }
        );
        if (type === 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(
                token
            );
            return auth
                .signInWithCredential(credential)
                .then(user => {
                    dispatch({ type: LOGIN_SUCCESS, payload: user });
                    return user;
                })
                .catch(error => {
                    dispatch({
                        type: LOGIN_FACEBOOK_FAIL,
                        error
                    });
                    throw error;
                });
        } else if (type === 'cancel') {
            const error = new Error('Facebook authentication canceled');
            dispatch({
                type: LOGIN_FACEBOOK_FAIL,
                error
            });
            throw error;
        }
        dispatch({ type: LOGIN_FACEBOOK_SUCCESS, payload: token });
        return token;
    } catch (error) {
        dispatch({ type: LOGIN_FACEBOOK_FAIL, error });
        throw error;
    }
};

export const signInWithEmailAndPassword = ({ email, password }) => dispatch => {
    dispatch({ type: LOGIN });
    return auth
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            dispatch({ type: LOGIN_SUCCESS, payload: user });
            return user;
        })
        .catch(error => {
            dispatch({ type: LOGIN_FAIL, error });
            throw error;
        });
};

export const signUp = ({ email, password, name, number }) => async dispatch => {
    try {
        dispatch({ type: SIGNUP });
        const user = await auth.createUserWithEmailAndPassword(email, password);
        dispatch({ type: SIGNUP_SUCCESS, payload: user });
        await updateAccount(user.uid, {
            displayName: String(name),
            phoneNumber: Number(number)
        });
        return user;
    } catch (error) {
        dispatch({ type: SIGNUP_FAIL, error });
        throw error;
    }
};

export const signOut = () => dispatch => {
    dispatch({ type: SIGNOUT });
    return auth
        .signOut()
        .then(result => {
            dispatch({ type: SIGNOUT_SUCCESS });
            return result;
        })
        .catch(error => {
            dispatch({ type: SIGNOUT_FAIL, error });
            throw error;
        });
};

export const updateAccount = (id, values) => dispatch => {
    dispatch({ type: UPDATE_ACCOUNT });
    return firestore
        .collection('users')
        .doc(id)
        .set(values, { merge: true })
        .then(result => {
            dispatch({ type: UPDATE_ACCOUNT_SUCCESS });
            return result;
        })
        .catch(error => {
            dispatch({ type: UPDATE_ACCOUNT_FAIL });
            throw error;
        });
};

export const authChanged = user => ({ type: AUTH_CHANGED, payload: user });
