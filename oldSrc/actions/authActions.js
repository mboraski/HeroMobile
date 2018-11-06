import { SubmissionError } from 'redux-form';

import { firebaseAuth, db, rtdb } from '../../firebase';

import { dropdownAlert } from './uiActions';

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
export const LOGIN = 'login';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_FAIL = 'login_fail';
export const SIGNUP = 'signup';
export const SIGNOUT = 'signout';
export const REDIRECT_TO_SIGNUP = 'redirect_to_signup';
export const UPDATE_ACCOUNT = 'update_account';
export const UPDATE_ACCOUNT_SUCCESS = 'update_account_success';
export const UPDATE_ACCOUNT_FAIL = 'update_account_fail';
export const LOGIN_FACEBOOK = 'login_facebook';
export const LOGIN_FACEBOOK_SUCCESS = 'login_facebook_success';
export const LOGIN_FACEBOOK_FAIL = 'login_facebook_fail';
export const CONTRACTOR_APPROVED = 'contractor_approved';

export const createUserWithEmailAndPassword = (values, dispatch) =>
    new Promise((resolve, reject) => {
        const { firstName, lastName, email, password, phoneNumber } = values;
        dispatch({
            type: SIGNUP_REQUEST
        });
        return firebaseAuth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredential =>
                db
                    .collection('users')
                    .doc(`${userCredential.user.uid}`)
                    .set({
                        firstName,
                        lastName,
                        email,
                        phoneNumber
                    })
            )
            .then(() => {
                dispatch({
                    type: SIGNUP_SUCCESS,
                    payload: {
                        firstName,
                        lastName,
                        email,
                        phoneNumber
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
                        _error: 'Crrrazy error'
                    })
                );
            });
    });

export const signInWithEmailAndPassword = (values, dispatch) =>
    new Promise((resolve, reject) => {
        const { email, password } = values;
        dispatch({
            type: SIGNIN_REQUEST
        });
        return firebaseAuth
            .signInWithEmailAndPassword(email, password)
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
                        _error: 'Crrrazy error' // TODO: change
                    })
                );
            });
    });

export const signOut = () => async dispatch => {
    try {
        dispatch({ type: SIGNOUT_REQUEST });
        const result = await firebaseAuth.signOut();
        return result;
    } catch (error) {
        dispatch({ type: SIGNOUT_FAIL, error });
        throw error;
    }
};

export const listenToAuthChanges = () => dispatch =>
    firebaseAuth.onAuthStateChanged(async user => {
        dispatch({ type: AUTH_CHANGED, payload: user });
        if (user) {
            dispatch({ type: SIGNIN_SUCCESS });
        } else {
            dispatch({ type: SIGNOUT_SUCCESS });
        }
    });

// export const checkContractorApproval = () => dispatch => {
//     const user = firebaseAuth.currentUser;
//     const uid = user ? user.uid : null;
//     const contractorRef = rtdb.ref(`contractors/${uid}`);
//     return contractorRef
//         .get()
//         .then(doc => {
//             if (doc.exists) {
//                 const data = doc.data();
//                 const approved = data.approval.approved;
//                 const pending = data.approval.pending;
//                 if (approved) {
//                     // set approval status in store
//                     // const connectId = data.stripeInfo.newStripeConnectAccount.id;
//                     // const connectId = data.inventory.newStripeConnectAccount.id;
//                     // fire auth action
//                     dispatch({ type: CONTRACTOR_APPROVED, payload: data });
//                     // dispatch({ type: CONTRACTOR_APPROVED, payload: connectId });
//                     // set contractor inventory
//                     fetchContractorInventory(dispatch);
//                     // navigate user to HeroMain
//                     dispatch({ type: GO_MAIN });
//                 } else if (pending) {
//                     // not approved, check status
//                     // if pending, show pending screen
//                 } else {
//                     // show signup form
//                 }
//             } else {
//                 // create one
//             }
//         })
//         .catch(error => {
//             // alert user that there was an error verifying contractor status and to try signing out and back in again.
//             console.log('checkContractorApproval error: ', error);
//             logContractorError({ uid, error });
//             dispatch(
//                 dropdownAlert(
//                     true,
//                     'Error verifying contractor status, please try again.'
//                 )
//             );
//         });
// };

export const updateAccount = (id, values) => dispatch => {
    dispatch({ type: UPDATE_ACCOUNT });
    return db
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
