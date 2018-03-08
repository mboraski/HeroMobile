import {
    // INVENTORY_REQUEST,
    INVENTORY_SUCCESS,
    // INVENTORY_FAILURE
} from '../actions/productActions';

export const initialState = {
    pending: false,
    error: null,
    availableProducts: {},
    deliveryType: '1',
    inventory: {}
};

export default function (state = initialState, action) {
    console.log('inventory reducer ran payload: ', action);
    switch (action.type) {
        // case INVENTORY_REQUEST:
        //     return {
        //         ...state,
        //         pending: true
        //     };
        case INVENTORY_SUCCESS:
        console.log('inventory success of reducer ran payload: ', action.payload);
            return {
                ...state,
                inventory: action.payload
            };
        // case INVENTORY_FAILURE:
        //     return {
        //         ...state,
        //         pending: false
        //     };
        default:
            return state;
    }
}
