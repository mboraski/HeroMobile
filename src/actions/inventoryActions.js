import firebase from '../firebase';
import { dropdownAlert } from './uiActions';

export const INVENTORY_REQUEST = 'inventory_request';
export const INVENTORY_SUCCESS = 'inventory_success';
export const INVENTORY_FAILURE = 'inventory_failure';
export const CONFIRM_INVENTORY_REQUEST = 'confirm_inventory_request';
export const CONFIRM_INVENTORY_SUCCESS = 'confirm_inventory_success';
export const CONFIRM_INVENTORY_FAILURE = 'confirm_inventory_failure';
export const ADD_TO_INVENTORY = 'add_to_inventory';
export const REMOVE_FROM_INVENTORY = 'remove_from_inventory';

export const fetchContractorInventory = (dispatch) => {
    dispatch({ type: INVENTORY_REQUEST });
    const user = firebase.auth().currentUser;
    const uid = user ? user.uid : null;
    const inventoryRef = firebase.database().ref(`heroes/${uid}/inventory`);
    inventoryRef.once('value')
        .then((snapshot) => {
            const inventory = snapshot.val();
            if (inventory) {
                console.log('inventory: ', inventory);
                dispatch({ type: INVENTORY_SUCCESS, payload: inventory });
            } else {
                console.log('empty inventory');
                dispatch({ type: INVENTORY_SUCCESS, payload: {} });
            }
        })
        .catch((error) => {
            console.log('inventory error: ', error);
            dispatch({ type: INVENTORY_FAILURE, payload: error });
        });
};

export const confirmUpdateInventory = (newInventory) => dispatch => {
    dispatch({ type: CONFIRM_INVENTORY_REQUEST });
    const user = firebase.auth().currentUser;
    const uid = user ? user.uid : null;
    const inventoryRef = firebase.database().ref(`heroes/${uid}/inventory`);
    inventoryRef.set(newInventory)
        .then(() => {
            dispatch(dropdownAlert(true, 'Successfully updated inventory'));
            dispatch({ type: CONFIRM_INVENTORY_SUCCESS, payload: newInventory });
        })
        .catch((error) => {
            dispatch({ type: CONFIRM_INVENTORY_FAILURE, payload: error });
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
