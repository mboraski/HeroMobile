import {
    SELECT_CATEGORY,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    SET_IMAGE,
    // INVENTORY_REQUEST,
    INVENTORY_SUCCESS,
    // INVENTORY_FAILURE
} from '../actions/productActions';

export const initialState = {
    pending: false,
    error: null,
    availableProducts: {
        instant: {}
    },
    category: 'SXSW',
    // products: {},
    productImages: {},
    inventory: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                pending: true
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                availableProducts: action.payload,
                error: null,
                pending: false,
            };
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                error: action.payload,
                pending: false,
            };
        case SELECT_CATEGORY:
            return {
                ...state,
                category: action.payload
            };
        case INVENTORY_SUCCESS:
        // console.log('inventory success of reducer ran payload: ', action.payload);
            return {
                ...state,
                inventory: action.payload
            };
        case SET_IMAGE: {
            const { productName = '', url = '' } = action.payload;
            const productImages = Object.assign({}, state.productImages, { [productName]: url });
            return {
                ...state,
                productImages
            };
        }
        default:
            return state;
    }
}
