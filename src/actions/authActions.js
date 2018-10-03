import { SubmissionError } from 'redux-form';

import { firebaseAuth, db, rtdb } from '../../firebase';

import { APP_ID } from '../constants/Facebook';
import { GO_MAIN } from './navigationActions';
import { dropdownAlert } from './uiActions';
import { fetchContractorInventory } from './inventoryActions';
import { logContractorError, logCurrentInventoryError } from '../api/hasty';

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
export const ONLINE = 'online';
export const OFFLINE = 'offline';

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

export const checkContractorApproval = () => dispatch => {
    const user = firebaseAuth.currentUser;
    const uid = user ? user.uid : null;
    console.log('checkContractorApproval ran uid: ', uid);
    const contractorRef = db.collection('contractors').doc(`${uid}`);
    return contractorRef
        .get()
        .then(doc => {
            if (doc.exists) {
                const data = doc.data();
                const approved = data.approval.approved;
                const pending = data.approval.pending;
                if (approved) {
                    console.log('contractor approved data: ', data);
                    // set approval status in store
                    // const connectId = data.stripeInfo.newStripeConnectAccount.id;
                    // const connectId = data.inventory.newStripeConnectAccount.id;
                    // fire auth action
                    dispatch({ type: CONTRACTOR_APPROVED });
                    // dispatch({ type: CONTRACTOR_APPROVED, payload: connectId });
                    // set contractor inventory
                    fetchContractorInventory(dispatch);
                    // navigate user to HeroMain
                    dispatch({ type: GO_MAIN });
                } else if (pending) {
                    // not approved, check status
                    // if pending, show pending screen
                } else {
                    // show signup form
                }
            } else {
                // create one
            }
        })
        .catch(error => {
            // alert user that there was an error verifying contractor status and to try signing out and back in again.
            console.log('checkContractorApproval error: ', error);
            logContractorError({ uid, error });
            dispatch(
                dropdownAlert(
                    true,
                    'Error verifying contractor status, please try again.'
                )
            );
        });
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
            return firebase
                .auth()
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

export const authChanged = user => dispatch => {
    console.log('authChanged ran');
    dispatch({ type: AUTH_CHANGED, payload: user });
};

export const getUserOnlineStatus = () => dispatch => {
    const user = firebaseAuth.currentUser;
    const uid = user ? user.uid : null;
    const activeHeroesRef = rtdb.ref(`activeHeroes/US/TX/Austin/${uid}`);
    return activeHeroesRef
        .once('value')
        .then(snapshot => {
            if (snapshot.val()) {
                dispatch({ type: ONLINE });
            } else {
                dispatch({ type: OFFLINE });
            }
        })
        .catch(error => {
            logContractorError(uid, error);
            dispatch(
                dropdownAlert(true, 'Error retrieving Hero online status')
            );
        });
};

export const online = (contractorProducts, currentLocation) => dispatch => {
    const user = firebaseAuth.currentUser;
    const uid = user ? user.uid : null;
    const activeProductsRef = rtdb.ref('activeProducts/US/TX/Austin/instant');
    return activeProductsRef
        .once('value')
        .then(snapshot => {
            let result;
            const currentProducts = snapshot.val();
            if (!currentProducts) {
                // set this new productList
                result = activeProductsRef
                    .set(contractorProducts)
                    .then(() => {
                        const activeHeroesRef = rtdb.ref(
                            `activeHeroes/US/TX/Austin/${uid}`
                        );
                        return activeHeroesRef
                            .set({
                                currentSetLatLon: {
                                    lat: currentLocation.lat,
                                    lon: currentLocation.lon
                                },
                                productList: contractorProducts
                            })
                            .then(() => {
                                dispatch(
                                    dropdownAlert(true, 'Successfully Online!')
                                );
                                dispatch({ type: ONLINE });
                            })
                            .catch(error => {
                                logContractorError(uid, error);
                                activeHeroesRef.remove();
                                dispatch(
                                    dropdownAlert(
                                        true,
                                        'Error setting Hero online status'
                                    )
                                );
                                dispatch({ type: OFFLINE });
                            });
                    })
                    .catch(error => {
                        logContractorError(uid, error);
                        dispatch(
                            dropdownAlert(
                                true,
                                'Error adding Hero product availability'
                            )
                        );
                        dispatch({ type: OFFLINE });
                    });
            } else {
                // loop through current products and add products this hero has
                const copyCurrentProducts = Object.assign({}, currentProducts);
                const newProducts = _.reduce(
                    contractorProducts,
                    (accum, product) => {
                        const cProduct =
                            copyCurrentProducts[product.productName] || null;
                        if (cProduct) {
                            accum[cProduct.productName] = {
                                quantity: cProduct.quantity + product.quantity,
                                productName: cProduct.productName,
                                imageUrl: cProduct.imageUrl,
                                price: cProduct.price
                            };
                        } else {
                            accum[product.productName] = product;
                        }
                        return accum;
                    },
                    copyCurrentProducts
                );
                // set this new productList
                result = activeProductsRef
                    .set(newProducts)
                    .then(() => {
                        const activeHeroesRef = rtdb.ref(
                            `activeHeroes/US/TX/Austin/${uid}`
                        );
                        return activeHeroesRef
                            .set({
                                currentSetLatLon: {
                                    lat: currentLocation.lat,
                                    lon: currentLocation.lon
                                },
                                productList: contractorProducts
                            })
                            .then(() => {
                                dispatch(
                                    dropdownAlert(true, 'Successfully Online!')
                                );
                                dispatch({ type: ONLINE });
                            })
                            .catch(error => {
                                logContractorError(uid, error);
                                activeHeroesRef.remove();
                                dispatch(
                                    dropdownAlert(
                                        true,
                                        'Error setting Hero online status'
                                    )
                                );
                                dispatch({ type: OFFLINE });
                            });
                    })
                    .catch(error => {
                        logContractorError(uid, error);
                        dispatch(
                            dropdownAlert(
                                true,
                                'Error adding Hero product availability'
                            )
                        );
                        dispatch({ type: OFFLINE });
                    });
            }
            return result;
        })
        .catch(error => {
            logContractorError(uid, error);
            console.log('error connecting to online db error: ', error);
            dispatch(
                dropdownAlert(true, 'Error connecting to online database')
            );
            dispatch({ type: OFFLINE });
        });
};

export const offline = contractorProducts => dispatch => {
    const user = firebaseAuth.currentUser;
    const uid = user.uid;
    const activeHeroesRef = rtdb.ref(`activeHeroes/US/TX/Austin/${uid}`);
    return activeHeroesRef
        .remove()
        .then(() => {
            const activeProductsRef = rtdb.ref(
                'activeProducts/US/TX/Austin/instant'
            );
            return activeProductsRef
                .once('value')
                .then(snapshot => {
                    const currentProducts = snapshot.val();
                    // loop through current products and add products this hero has
                    const copyCurrentProducts = Object.assign(
                        {},
                        currentProducts
                    );
                    const newProducts = _.reduce(
                        contractorProducts,
                        (accum, product) => {
                            const cProduct =
                                copyCurrentProducts[product.productName] ||
                                null;
                            if (cProduct) {
                                const quantity =
                                    cProduct.quantity - product.quantity;
                                if (quantity > 0) {
                                    accum[cProduct.productName] = {
                                        quantity,
                                        productName: cProduct.productName,
                                        imageUrl: cProduct.imageUrl,
                                        price: cProduct.price
                                    };
                                } else {
                                    accum[cProduct.productName] = null;
                                }
                            } else {
                                accum[product.productName] = product;
                            }
                            return accum;
                        },
                        copyCurrentProducts
                    );
                    return activeProductsRef
                        .set(newProducts)
                        .then(() => {
                            dispatch(
                                dropdownAlert(true, 'Successfully Offline!')
                            );
                            dispatch({ type: OFFLINE });
                        })
                        .catch(error => {
                            logContractorError(uid, error);
                            logCurrentInventoryError(uid, error, newProducts);
                            dispatch(
                                dropdownAlert(
                                    true,
                                    'Offline, but error setting available products'
                                )
                            );
                            dispatch({ type: OFFLINE });
                        });
                })
                .catch(error => {
                    logContractorError(uid, error);
                    logCurrentInventoryError(uid, error, null);
                    dispatch(
                        dropdownAlert(
                            true,
                            'Offline, but error reading product availability'
                        )
                    );
                    dispatch({ type: OFFLINE });
                });
        })
        .catch(error => {
            logContractorError(uid, error);
            dispatch(dropdownAlert(true, 'Error going offline'));
            dispatch({ type: ONLINE });
        });
};
