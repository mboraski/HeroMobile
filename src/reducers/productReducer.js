import {
    SELECT_CATEGORY,
    FETCH_CUSTOMER_BLOCK_REQUEST,
    FETCH_CUSTOMER_BLOCK_SUCCESS,
    FETCH_CUSTOMER_BLOCK_ERROR,
    SET_IMAGE
} from '../actions/productActions';
import { SIGNOUT_SUCCESS } from '../actions/authActions';

export const initialState = {
    pending: false,
    error: null,
    availableProducts: {
        instant: {}
    },
    category: 'all',
    productImages: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SIGNOUT_SUCCESS:
            return initialState;
        case FETCH_CUSTOMER_BLOCK_REQUEST:
            return {
                ...state,
                pending: true
            };
        case FETCH_CUSTOMER_BLOCK_SUCCESS:
            return {
                ...state,
                availableProducts: action.payload,
                error: null,
                pending: false
            };
        case FETCH_CUSTOMER_BLOCK_ERROR:
            return {
                ...state,
                error: action.payload,
                pending: false
            };
        case SELECT_CATEGORY:
            return {
                ...state,
                category: action.payload
            };
        case SET_IMAGE: {
            const { productName, url } = action.payload;
            const productImages = Object.assign({}, state.productImages, {
                [productName]: url
            });
            return {
                ...state,
                productImages
            };
        }
        default:
            return state;
    }
}
