import { firebaseAuth, rtdb } from '../../firebase';
import { dropdownAlert } from './uiActions';
import { logContractorError } from '../api/hasty';

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
export const ONLINE = 'online';
export const OFFLINE = 'offline';

const ORDER_REF = 'activeProducts/US/TX/Austin/orders';

export const fetchContractor = () => dispatch => {
    dispatch({ type: FETCH_CONTRACTOR_REQUEST });
    const user = firebaseAuth.currentUser;
    const uid = user ? user.uid : '';
    const activeHeroesRef = rtdb.ref(`contractors/${uid}`);
    return activeHeroesRef
        .once('value')
        .then(snapshot => {
            const heroData = snapshot.val();
            console.log('hero data: ', heroData);
            if (heroData && heroData.online) {
                dispatch({ type: FETCH_CONTRACTOR_SUCCESS, payload: heroData });
                dispatch({ type: ONLINE });
            } else {
                dispatch({ type: FETCH_CONTRACTOR_SUCCESS, payload: heroData });
                dispatch({ type: OFFLINE });
            }
        })
        .catch(error => {
            console.log('fetch contractor error: ', error);
            dispatch({ type: FETCH_CONTRACTOR_ERROR, payload: error });
            dispatch(
                dropdownAlert(true, 'Error retrieving Hero online status')
            );
        });
};

export const online = (region, dispatch) => {
    const user = firebaseAuth.currentUser;
    const uid = user.uid;
    const contractorRef = rtdb.ref(`contractors/${uid}`);
    return contractorRef
        .update({ online: true, region })
        .then(() => {
            dispatch({ type: ONLINE });
            dispatch(dropdownAlert(true, 'Successfully Online!'));
        })
        .catch(error => {
            dispatch({ type: OFFLINE });
            logContractorError(uid, error);
            dispatch(dropdownAlert(true, 'Error setting Hero online status'));
        });
};

export const offline = () => dispatch => {
    const user = firebaseAuth.currentUser;
    const uid = user.uid;
    const contractorRef = rtdb.ref(`contractors/${uid}`);
    return contractorRef
        .child('online')
        .set(false)
        .then(() => {
            dispatch({ type: OFFLINE });
            dispatch(dropdownAlert(true, 'Successfully Offline!'));
        })
        .catch(error => {
            dispatch({ type: ONLINE });
            logContractorError(uid, error);
            dispatch(dropdownAlert(true, 'Error setting Hero online status'));
        });
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

export const changeOrderStatus = () => dispatch => {
    const user = firebaseAuth.currentUser;
    const uid = user.uid;
    const contractorRef = rtdb.ref(`contractors/${uid}`);
    return contractorRef
        .update({ online: true, region })
        .then(() => {
            dispatch({ type: ONLINE });
            dispatch(dropdownAlert(true, 'Successfully Online!'));
        })
        .catch(error => {
            dispatch({ type: OFFLINE });
            logContractorError(uid, error);
            dispatch(dropdownAlert(true, 'Error setting Hero online status'));
        });
};

export const fetchContractorInventory = dispatch => {
    dispatch({ type: INVENTORY_REQUEST });
    const user = firebaseAuth.currentUser;
    const uid = user ? user.uid : null;
    const inventoryRef = rtdb.ref(`contractors/${uid}/inventory`);
    inventoryRef
        .once('value')
        .then(snapshot => {
            const inventory = snapshot.val();
            if (inventory) {
                console.log('inventory: ', inventory);
                dispatch({ type: INVENTORY_SUCCESS, payload: inventory });
            } else {
                console.log('empty inventory');
                dispatch({ type: INVENTORY_SUCCESS, payload: {} });
            }
        })
        .catch(error => {
            console.log('inventory error: ', error);
            dispatch({ type: INVENTORY_ERROR, payload: error });
        });
};

export const confirmUpdateInventory = newInventory => dispatch => {
    dispatch({ type: CONFIRM_INVENTORY_REQUEST });
    const user = firebaseAuth.currentUser;
    const uid = user ? user.uid : null;
    const inventoryRef = rtdb.ref(`contractors/${uid}/inventory`);
    inventoryRef
        .set(newInventory)
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
};

export const addToInventory = product => ({
    type: ADD_TO_INVENTORY,
    payload: product
});

export const removeFromInventory = product => ({
    type: REMOVE_FROM_INVENTORY,
    payload: product
});
