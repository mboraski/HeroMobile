import { Facebook } from 'expo';
import _ from 'lodash';

import firebase from '../firebase';
import { APP_ID } from '../constants/Facebook';
import { GO_MAIN } from './navigationActions';
import { dropdownAlert } from './uiActions';
import {
    INVENTORY_REQUEST,
    INVENTORY_SUCCESS,
    INVENTORY_FAILURE
} from './productActions';
import { logContractorError, logCurrentInventoryError } from '../api/hasty';

export const LOGIN = 'login';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_FAIL = 'login_fail';
export const SIGNUP = 'signup';
export const SIGNUP_SUCCESS = 'signup_success';
export const SIGNUP_FAIL = 'signup_fail';
export const SIGNOUT = 'signout';
export const SIGNOUT_SUCCESS = 'signout_success';
export const SIGNOUT_FAIL = 'signout_fail';
export const REDIRECT_TO_SIGNUP = 'redirect_to_signup';
export const AUTH_CHANGED = 'auth_changed';
export const UPDATE_ACCOUNT = 'update_account';
export const UPDATE_ACCOUNT_SUCCESS = 'update_account_success';
export const UPDATE_ACCOUNT_FAIL = 'update_account_fail';
export const LOGIN_FACEBOOK = 'login_facebook';
export const LOGIN_FACEBOOK_SUCCESS = 'login_facebook_success';
export const LOGIN_FACEBOOK_FAIL = 'login_facebook_fail';
export const CONTRACTOR_APPROVED = 'contractor_approved';
export const ONLINE = 'online';
export const OFFLINE = 'offline';


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

export const fetchContractorInventory = (dispatch) => {
    dispatch({ type: INVENTORY_REQUEST });
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const inventoryRef = firebase.database().ref(`heroes/${uid}/inventory`);
    inventoryRef.once('value')
        .then((snapshot) => {
            const inventory = snapshot.val();
            console.log('inventory: ', inventory);
            dispatch({ type: INVENTORY_SUCCESS, payload: inventory });
        })
        .catch((error) => {
            console.log('inventory error: ', error);
            dispatch({ type: INVENTORY_FAILURE, payload: error });
        });
};

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
                    // const connectId = data.inventory.newStripeConnectAccount.id;
                    // fire auth action
                    dispatch({ type: CONTRACTOR_APPROVED, payload: connectId });
                    // set contractor inventory
                    fetchContractorInventory(dispatch);
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

export const getUserOnlineStatus = () => dispatch => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const activeHeroesRef = firebase.database().ref(`activeHeroes/US/TX/Austin/${uid}`);
    return activeHeroesRef.once('value')
        .then((snapshot) => {
            if (snapshot.val()) {
                dispatch({ type: ONLINE });
            } else {
                dispatch({ type: OFFLINE });
            }
        })
        .catch((error) => {
            logContractorError(uid, error);
            dispatch(dropdownAlert(true, 'Error retrieving Hero online status'));
        });
};

export const online = (contractorProducts, currentLocation) => dispatch => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const activeProductsRef = firebase.database().ref('activeProducts/US/TX/Austin/instant');
    return activeProductsRef.once('value')
        .then((snapshot) => {
            let result;
            const currentProducts = snapshot.val();
            if (!currentProducts) {
                // set this new productList
                result = activeProductsRef.set(contractorProducts)
                    .then(() => {
                        const activeHeroesRef = firebase.database().ref(`activeHeroes/US/TX/Austin/${uid}`);
                        return activeHeroesRef.set({
                            currentSetLatLon: { lat: currentLocation.lat, lon: currentLocation.lon },
                            productList: contractorProducts
                        })
                            .then(() => {
                                dispatch(dropdownAlert(true, 'Successfully Online!'));
                                dispatch({ type: ONLINE });
                            })
                            .catch((error) => {
                                logContractorError(uid, error);
                                activeHeroesRef.remove();
                                dispatch(dropdownAlert(true, 'Error setting Hero online status'));
                                dispatch({ type: OFFLINE });
                            });
                    })
                    .catch((error) => {
                        logContractorError(uid, error);
                        dispatch(dropdownAlert(true, 'Error adding Hero product availability'));
                        dispatch({ type: OFFLINE });
                    });
            } else {
                // loop through current products and add products this hero has
                const copyCurrentProducts = Object.assign({}, currentProducts);
                const newProducts = _.reduce(contractorProducts, (accum, product) => {
                    const cProduct = copyCurrentProducts[product.productName] || null;
                    if (cProduct) {
                        accum[cProduct.productName] = {
                            quantity: cProduct.quantity + product.quantity,
                            productName: cProduct.productName,
                            imageUrl: cProduct.imageUrl,
                            price: cProduct.price
                        }
                    } else {
                        accum[product.productName] = product;
                    }
                    return accum;
                }, copyCurrentProducts);
                // set this new productList
                result = activeProductsRef.set(newProducts)
                    .then(() => {
                        const activeHeroesRef = firebase.database().ref(`activeHeroes/US/TX/Austin/${uid}`);
                        return activeHeroesRef.set({
                            currentSetLatLon: { lat: currentLocation.lat, lon: currentLocation.lon },
                            productList: contractorProducts
                        })
                            .then(() => {
                                dispatch(dropdownAlert(true, 'Successfully Online!'));
                                dispatch({ type: ONLINE });
                            })
                            .catch((error) => {
                                logContractorError(uid, error);
                                activeHeroesRef.remove();
                                dispatch(dropdownAlert(true, 'Error setting Hero online status'));
                                dispatch({ type: OFFLINE });
                            });
                    })
                    .catch((error) => {
                        logContractorError(uid, error);
                        dispatch(dropdownAlert(true, 'Error adding Hero product availability'));
                        dispatch({ type: OFFLINE });
                    });
                }
                return result;
            })
            .catch((error) => {
                logContractorError(uid, error);
                console.log('error connecting to online db error: ', error);
                dispatch(dropdownAlert(true, 'Error connecting to online database'));
                dispatch({ type: OFFLINE });
            });
};

export const offline = (contractorProducts) => dispatch => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const activeHeroesRef = firebase.database().ref(`activeHeroes/US/TX/Austin/${uid}`);
    return activeHeroesRef.remove()
        .then(() => {
            const activeProductsRef = firebase.database().ref('activeProducts/US/TX/Austin/instant');
            return activeProductsRef.once('value')
                .then((snapshot) => {
                    const currentProducts = snapshot.val();
                    // loop through current products and add products this hero has
                    const copyCurrentProducts = Object.assign({}, currentProducts);
                    const newProducts = _.reduce(contractorProducts, (accum, product) => {
                        const cProduct = copyCurrentProducts[product.productName] || null;
                        if (cProduct) {
                            const quantity = cProduct.quantity - product.quantity;
                            if (quantity > 0) {
                                accum[cProduct.productName] = {
                                    quantity,
                                    productName: cProduct.productName,
                                    imageUrl: cProduct.imageUrl,
                                    price: cProduct.price
                                }
                            } else {
                                accum[cProduct.productName] = null;
                            }
                        } else {
                            accum[product.productName] = product;
                        }
                        return accum;
                    }, copyCurrentProducts);
                    return activeProductsRef.set(newProducts)
                        .then(() => {
                            dispatch(dropdownAlert(true, 'Successfully Offline!'));
                            dispatch({ type: OFFLINE });
                        })
                        .catch((error) => {
                            logContractorError(uid, error);
                            logCurrentInventoryError(uid, error, newProducts);
                            dispatch(dropdownAlert(true, 'Offline, but error setting available products'));
                            dispatch({ type: OFFLINE });
                        });
                })
                .catch((error) => {
                    logContractorError(uid, error);
                    logCurrentInventoryError(uid, error, null);
                    dispatch(dropdownAlert(true, 'Offline, but error reading product availability'));
                    dispatch({ type: OFFLINE });
                });
        })
        .catch((error) => {
            logContractorError(uid, error);
            dispatch(dropdownAlert(true, 'Error going offline'));
            dispatch({ type: ONLINE });
        });
};
