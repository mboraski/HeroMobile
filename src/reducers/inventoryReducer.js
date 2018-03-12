import {
    // INVENTORY_REQUEST,
    INVENTORY_SUCCESS,
    // INVENTORY_FAILURE,
    CONFIRM_INVENTORY_SUCCESS,
    CONFIRM_INVENTORY_FAILURE,
    CONFIRM_INVENTORY_REQUEST,
    ADD_TO_INVENTORY,
    REMOVE_FROM_INVENTORY
} from '../actions/inventoryActions';

export const initialState = {
    inventory: {},
    pending: false,
    error: null
};

const addProductToInventory = (product, inventory) => {
    const instantInventory = Object.assign({}, inventory);
    const inventoryItem = instantInventory[product.productName] || {};
    inventoryItem.quantity += 1;
    return instantInventory;
};

const removeProductFromInventory = (product, inventory) => {
    const instantInventory = Object.assign({}, inventory);
    const inventoryItem = instantInventory[product.productName] || {};
    if (inventoryItem.quantity > 0) {
        inventoryItem.quantity -= 1;
    }
    return instantInventory;
};

export default function (state = initialState, action) {
    switch (action.type) {
        case INVENTORY_SUCCESS:
        console.log('inventory success of reducer ran payload: ', action.payload);
            return {
                ...state,
                inventory: action.payload,
                pending: false,
            };
        case CONFIRM_INVENTORY_SUCCESS:
        // console.log('inventory success of reducer ran payload: ', action.payload);
            return {
                ...state,
                inventory: action.payload,
                pending: false
            };
        case CONFIRM_INVENTORY_FAILURE:
        // console.log('inventory success of reducer ran payload: ', action.payload);
            return {
                ...state,
                error: action.payload,
                pending: false
            };
        case CONFIRM_INVENTORY_REQUEST:
        // console.log('inventory success of reducer ran payload: ', action.payload);
            return {
                ...state,
                pending: true
            };
        case ADD_TO_INVENTORY: {
            const product = action.payload;
            const newInventory = addProductToInventory(product, state.inventory);
            return {
                ...state,
                inventory: newInventory
            };
        }
        case REMOVE_FROM_INVENTORY: {
            const product = action.payload;
            const newInventory = removeProductFromInventory(product, state.inventory);
            return {
                ...state,
                inventory: newInventory
            };
        }
        default:
            return state;
    }
}
