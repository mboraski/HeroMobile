import _ from 'lodash';
import firebase from '../firebase';
import {
    INVENTORY_REQUEST,
    INVENTORY_SUCCESS,
    INVENTORY_FAILURE
} from './productActions';

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
    const newInventory = {};
    newInventory.instant = _.filter(this.props.cart.instant, (product) => (product.quantityTaken > 0))
    // update database
    //dispatch action
}
