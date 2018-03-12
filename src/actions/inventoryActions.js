import _ from 'lodash';
import firebase from '../firebase';
import { dropdownAlert } from './uiActions';

export const INVENTORY_REQUEST = 'inventory_request';
export const INVENTORY_SUCCESS = 'inventory_success';
export const INVENTORY_FAILURE = 'inventory_failure';
export const CONFIRM_INVENTORY_REQUEST = 'confirm_inventory_request';
export const CONFIRM_INVENTORY_SUCCESS = 'confirm_inventory_success';
export const CONFIRM_INVENTORY_FAILURE = 'confirm_inventory_failure';

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

export const confirmUpdateInventory = (cart) => dispatch => {
    dispatch({ type: CONFIRM_INVENTORY_REQUEST });
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const filteredInventory = _.filter(cart.instant, (product) => (product.quantityTaken > 0))
    const newInventory = _.reduce(filteredInventory, (accum, product) => {
        accum[product.productName] = product;
        return accum;
    }, {});
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
