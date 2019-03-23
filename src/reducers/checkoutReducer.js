import {
    SET_DELIVERY_NOTES,
    SET_SALES_TAX_RATE,
    SET_SERVICE_FEE_RATE,
    SET_DELIVERY_FEE,
    SET_DISCOUNT
} from '../actions/checkoutActions';
import { SIGNOUT_SUCCESS } from '../actions/authActions';

export const initialState = {
    notes: '',
    salesTaxRate: 0.0825,
    serviceFeeRate: 0.2,
    deliveryFee: 899,
    discount: 899
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGNOUT_SUCCESS:
            return initialState;
        case SET_DELIVERY_NOTES:
            return {
                ...state,
                notes: action.payload
            };
        case SET_SALES_TAX_RATE:
            return {
                ...state,
                salesTaxRate: action.payload
            };
        case SET_SERVICE_FEE_RATE:
            return {
                ...state,
                serviceFeeRate: action.payload
            };
        case SET_DELIVERY_FEE:
            return {
                ...state,
                deliveryFee: action.payload
            };
        case SET_DISCOUNT:
            return {
                ...state,
                discount: action.payload
            };
        default:
            return state;
    }
};
