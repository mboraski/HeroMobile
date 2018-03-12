import {
    // INVENTORY_REQUEST,
    INVENTORY_SUCCESS,
    // INVENTORY_FAILURE
} from '../actions/inventoryActions';

export const initialState = {
    inventory: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case INVENTORY_SUCCESS:
        // console.log('inventory success of reducer ran payload: ', action.payload);
            return {
                ...state,
                inventory: action.payload
            };
        default:
            return state;
    }
};
