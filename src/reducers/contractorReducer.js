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
    ONLINE_STATUS_CHANGE_REQUEST,
    ONLINE,
    OFFLINE,
    MERGE_INVENTORIES
} from '../actions/contractorActions';

export const initialState = {
    inventory: {},
    method: 'walk',
    online: false,
    status: '',
    firstName: '',
    lastName: '',
    pending: false,
    onlineStatusPending: false,
    orders: {},
    error: null
};

const addProductToInventory = (product, inventory) => {
    const instantInventory = Object.assign({}, inventory);
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
            return {
                ...state,
                inventory: action.payload || {},
                pending: false
            };
        case CONFIRM_INVENTORY_ERROR:
            return {
                ...state,
                error: action.payload,
                pending: false
            };
        case CONFIRM_INVENTORY_REQUEST:
            return {
                ...state,
                pending: true
            };
        case ADD_TO_INVENTORY: {
            const product = action.payload;
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
        case ONLINE_STATUS_CHANGE_REQUEST:
            return {
                ...state,
                onlineStatusPending: true
            };
        case ONLINE:
            return {
                ...state,
                online: true,
                onlineStatusPending: false
            };
        case OFFLINE:
            return {
                ...state,
                online: false,
                onlineStatusPending: false
            };
        case UPDATE_ORDERS:
            return {
                ...state,
                orders: action.payload,
                pending: false
            };
        case MERGE_INVENTORIES:
            return {
                ...state,
                inventory: action.payload
            };
        default:
            return state;
    }
}
