import {
    FETCH_CONTRACTOR_REQUEST,
    FETCH_CONTRACTOR_SUCCESS,
    FETCH_CONTRACTOR_ERROR,
    INVENTORY_REQUEST,
    INVENTORY_SUCCESS,
    INVENTORY_ERROR,
    CONFIRM_INVENTORY_SUCCESS,
    CONFIRM_INVENTORY_ERROR,
    CONFIRM_INVENTORY_REQUEST,
    ADD_TO_INVENTORY,
    REMOVE_FROM_INVENTORY,
    UPDATE_ORDERS,
    ONLINE,
    OFFLINE
} from '../actions/contractorActions';

export const initialState = {
    inventory: {},
    method: 'walk',
    online: false,
    status: '',
    firstName: '',
    lastName: '',
    pending: false,
    orders: {},
    error: null
};

const addProductToInventory = (product, inventory) => {
    console.log('addProductToInventory inventory: ', inventory);
    const instantInventory = Object.assign({}, inventory);
    console.log('addProductToInventory instantInventory: ', instantInventory);
    if (!instantInventory[product.productName]) {
        instantInventory[product.productName] = product;
    }
    if (product.quantityAvailable > product.quantityTaken) {
        instantInventory[product.productName].quantityTaken += 1;
    }
    return instantInventory;
};

const removeProductFromInventory = (product, inventory) => {
    const instantInventory = Object.assign({}, inventory);
    const inventoryItem = instantInventory[product.productName] || {};
    if (inventoryItem.quantityAvailable > 0) {
        inventoryItem.quantityTaken -= 1;
    }
    return instantInventory;
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_CONTRACTOR_REQUEST:
            return {
                ...state,
                pending: true
            };
        case FETCH_CONTRACTOR_SUCCESS:
            return {
                ...state,
                inventory: action.payload.inventory,
                method: action.payload.method,
                online: action.payload.online,
                status: action.payload.status,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                pending: false
            };
        case FETCH_CONTRACTOR_ERROR:
            return {
                ...state,
                error: action.payload,
                pending: false
            };
        case INVENTORY_REQUEST:
            return {
                ...state,
                pending: true
            };
        case INVENTORY_SUCCESS:
            return {
                ...state,
                inventory: action.payload,
                pending: false
            };
        case INVENTORY_ERROR:
            return {
                ...state,
                error: action.payload,
                pending: false
            };
        case CONFIRM_INVENTORY_SUCCESS:
            // console.log('inventory success of reducer ran payload: ', action.payload);
            return {
                ...state,
                inventory: action.payload || {},
                pending: false
            };
        case CONFIRM_INVENTORY_ERROR:
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
            console.log('state: ', state);
            const newInventory = addProductToInventory(
                product,
                state.inventory
            );
            return {
                ...state,
                inventory: newInventory
            };
        }
        case REMOVE_FROM_INVENTORY: {
            const product = action.payload;
            const newInventory = removeProductFromInventory(
                product,
                state.inventory
            );
            return {
                ...state,
                inventory: newInventory
            };
        }
        case ONLINE:
            return {
                ...state,
                online: true
            };
        case OFFLINE:
            return {
                ...state,
                online: false
            };
        case UPDATE_ORDERS:
            return {
                ...state,
                orders: action.payload,
                pending: false
            };
        default:
            return state;
    }
}
