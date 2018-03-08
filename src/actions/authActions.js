import { Facebook } from 'expo';

import firebase from '../firebase';
import { APP_ID } from '../constants/Facebook';
import { GO_MAIN } from './navigationActions';
import { dropdownAlert } from './uiActions';
import { logContractorError } from '../api/hasty';

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
export const CONTRACTOR_APPROVED = 'contractor_approved';


export const checkContractorApproval = (dispatch) => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    console.log('checkContractorApproval ran uid: ', uid);
    const contractorRef = firebase.firestore().collection('contractors').doc(`${uid}`);
    return contractorRef.get()
        .then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                const approved = data.approval.approved;
                const pending = data.approval.pending;
                if (approved) {
                    console.log('contractor approved data: ', data);
                    // set approval status in store
                    const connectId = data.stripeInfo.newStripeConnectAccount.id;
                    // fire auth action
                    dispatch({ type: CONTRACTOR_APPROVED, payload: connectId });
                    // navigate user to HeroMain
                    dispatch({ type: GO_MAIN });
                } else if (pending){
                    // not approved, check status
                    // if pending, show pending screen
                } else {
                    // show signup form
                }
            } else {
                // create one
            }
        })
        .catch((error) => {
            // alert user that there was an error verifying contractor status and to try signing out and back in again.
            console.log('checkContractorApproval error: ', error);
            logContractorError({ uid, error });
            dispatch(dropdownAlert(true, 'Error verifying contractor status, please try again.'))
        })
};

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
            return firebase.auth()
                .signInWithCredential(credential)
                .then(user => {
                    dispatch({ type: LOGIN_SUCCESS, payload: user });
                    checkContractorApproval(user, dispatch);
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
    return firebase.auth()
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
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
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
    return firebase.auth()
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
    return firebase.firestore()
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

export const authChanged = (user) => dispatch => {
    console.log('authChanged ran');
    if (user) {
        console.log('authChanged user: ', user);
        checkContractorApproval(dispatch);
    }
    dispatch({ type: AUTH_CHANGED, payload: user });
};
