import { firebaseAuth, rtdb } from '../../firebase';
import { dropdownAlert } from './uiActions';
import { sendMessage } from './orderActions';
import { logContractorError } from '../api/hasty';
import { updateCart } from './cartActions';

export const FETCH_CONTRACTOR_REQUEST = 'inventory_request';
export const FETCH_CONTRACTOR_SUCCESS = 'inventory_success';
export const FETCH_CONTRACTOR_ERROR = 'inventory_error';
export const INVENTORY_REQUEST = 'inventory_request';
export const INVENTORY_SUCCESS = 'inventory_success';
export const INVENTORY_ERROR = 'inventory_error';
export const CONFIRM_INVENTORY_REQUEST = 'confirm_inventory_request';
export const CONFIRM_INVENTORY_SUCCESS = 'confirm_inventory_success';
export const CONFIRM_INVENTORY_ERROR = 'confirm_inventory_error';
export const ADD_TO_INVENTORY = 'add_to_inventory';
export const REMOVE_FROM_INVENTORY = 'remove_from_inventory';
export const UPDATE_ORDERS = 'update_orders';
export const ONLINE_STATUS_CHANGE_REQUEST = 'online_status_change_request';
export const ONLINE = 'online';
export const OFFLINE = 'offline';
export const MERGE_INVENTORIES = 'merge_inventories';

const ORDER_REF = 'activeProducts/US/TX/Austin/orders';
const CONSUMER_BLOCK_REF = 'activeProducts/US/TX/Austin';

export const fetchContractor = () => dispatch => {
    dispatch({ type: FETCH_CONTRACTOR_REQUEST });
    const user = firebaseAuth.currentUser;
    if (user) {
        const uid = user.uid;
        const activeHeroesRef = rtdb.ref(`contractors/${uid}`);
        return activeHeroesRef
            .once('value')
            .then(snapshot => {
                const heroData = snapshot.val();
                if (heroData && heroData.online) {
                    dispatch({
                        type: FETCH_CONTRACTOR_SUCCESS,
                        payload: heroData
                    });
                    dispatch(updateCart({ instant: heroData.inventory }));
                    dispatch({ type: ONLINE });
                } else {
                    dispatch({
                        type: FETCH_CONTRACTOR_SUCCESS,
                        payload: heroData
                    });
                    dispatch(updateCart({ instant: heroData.inventory }));
                    dispatch({ type: OFFLINE });
                }
            })
            .catch(error => {
                console.warn(
                    'contractorActions; fetchContractor; error: ',
                    error
                );
                dispatch({ type: FETCH_CONTRACTOR_ERROR, payload: error });
                dispatch(
                    dropdownAlert(true, 'Error retrieving Hero online status')
                );
            });
    }
};

export const online = (region, dispatch, inventory) => {
    const user = firebaseAuth.currentUser;
    if (user) {
        const uid = user.uid;
        const contractorRef = rtdb.ref(`contractors/${uid}`);
        const consumerBlockRef = rtdb.ref(CONSUMER_BLOCK_REF);
        return contractorRef
            .update({
                online: true,
                region,
                status: 'available',
                method: 'walking' // Add inventory
            })
            .then(() => {
                // TODO: this is a temporary way to handle the contractor location
                // This should be removed when location is fluid
                return consumerBlockRef.child('contractorRegion').set({
                    latitude: region.latitude,
                    longitude: region.longitude,
                    mode: 'walking'
                });
            })
            .then(() => {
                return consumerBlockRef.child(`contractors/${user.uid}`).set({
                    deliveryTime: 240,
                    firstName: 'Mark', // Don't set here, have set with user record
                    lastName: 'Boraski', // same
                    phoneNumber: '+15126690628', // same
                    photoUrl: 'na', // same
                    status: 'available'
                });
            })
            .then(() => {
                return consumerBlockRef
                    .child('products/instant')
                    .set({ ...inventory });
            })
            .then(() => {
                dispatch({ type: ONLINE });
                dispatch(dropdownAlert(true, 'Successfully Online!'));
            })
            .catch(error => {
                dispatch({ type: OFFLINE });
                console.warn('contractor online error: ', error);
                dispatch(
                    dropdownAlert(true, 'Error setting Hero online status')
                );
            });
    }
};

export const offline = () => dispatch => {
    dispatch({ type: ONLINE_STATUS_CHANGE_REQUEST });
    const user = firebaseAuth.currentUser;
    if (user) {
        dispatch({ type: OFFLINE });
        const uid = user.uid;
        const contractorRef = rtdb.ref(`contractors/${uid}`);
        const consumerBlockRef = rtdb.ref(CONSUMER_BLOCK_REF);
        return contractorRef
            .child('online')
            .set(false)
            .then(() => {
                return consumerBlockRef.child('contractorRegion').set(null);
            })
            .then(() => {
                return consumerBlockRef
                    .child(`contractors/${user.uid}`)
                    .set(null);
            })
            .then(() => {
                return consumerBlockRef.child('products/instant').set(null);
            })
            .then(() => {
                dispatch(dropdownAlert(true, 'Successfully Offline!'));
            })
            .catch(error => {
                dispatch({ type: ONLINE });
                logContractorError(uid, error);
                dispatch(
                    dropdownAlert(true, 'Error setting Hero online status')
                );
            });
    }
};

export const listenToOrders = () => dispatch => {
    return rtdb.ref(`${ORDER_REF}`).on('value', snapshot => {
        const data = snapshot.val();
        if (data) {
            dispatch({ type: UPDATE_ORDERS, payload: data });
        }
    });
};

export const unListenToOrders = () => rtdb.ref(`${ORDER_REF}`).off();

export const changeOrderStatus = (status, orderId) => dispatch => {
    const contractor = firebaseAuth.currentUser;
    if (contractor) {
        const orderRef = rtdb.ref(
            `${CONSUMER_BLOCK_REF}/orders/${orderId}/fulfillment/actualFulfillment/full/${
                contractor.uid
            }`
        );
        /* TODO: posts status updates until notification system is worked out */
        const content = `Status: ${status}`;
        sendMessage(content, orderId, contractor.uid)(dispatch);
        /* End */
        return orderRef.update({ status });
    }
};

export const fetchContractorInventory = dispatch => {
    const user = firebaseAuth.currentUser;
    if (user) {
        dispatch({ type: INVENTORY_REQUEST });
        const uid = user ? user.uid : null;
        const inventoryRef = rtdb.ref(`contractors/${uid}/inventory`);
        inventoryRef
            .once('value')
            .then(snapshot => {
                const inventory = snapshot.val();
                if (inventory) {
                    dispatch({ type: INVENTORY_SUCCESS, payload: inventory });
                } else {
                    dispatch({ type: INVENTORY_SUCCESS, payload: {} });
                }
            })
            .catch(error => {
                dispatch({ type: INVENTORY_ERROR, payload: error });
            });
    }
};

export const confirmUpdateInventory = newInventory => dispatch => {
    const user = firebaseAuth.currentUser;
    if (user) {
        dispatch({ type: CONFIRM_INVENTORY_REQUEST });
        const uid = user ? user.uid : null;
        const inventoryRef = rtdb.ref(`contractors/${uid}`);
        inventoryRef
            .child('inventory')
            .set({ ...newInventory })
            .then(() => {
                dispatch(dropdownAlert(true, 'Successfully updated inventory'));
                dispatch({
                    type: CONFIRM_INVENTORY_SUCCESS,
                    payload: newInventory
                });
            })
            .catch(error => {
                dispatch({ type: CONFIRM_INVENTORY_ERROR, payload: error });
            });
    }
};

export const mergeInventories = productList => ({
    type: MERGE_INVENTORIES,
    payload: productList
});

export const addToInventory = product => ({
    type: ADD_TO_INVENTORY,
    payload: product
});

export const removeFromInventory = product => ({
    type: REMOVE_FROM_INVENTORY,
    payload: product
});
