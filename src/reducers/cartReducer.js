import {
    addProductToCart,
    removeProductFromCart,
    mergeCarts
} from './utils/cartReducerUtils';
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART,
    CLEAR_CART
} from '../actions/cartActions';
import { SIGNOUT_SUCCESS } from '../actions/authActions';

// function normalizeCurrency(currency) {
//     if (typeof currency === 'string') return Number(currency.replace(/[^0-9\.-]+/g, ''));
//     return currency;
// }

const initialState = {
    products: {
        instant: {}
    },
    itemCountUp: false,
    itemCountDown: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGNOUT_SUCCESS:
            return initialState;
        case CLEAR_CART: {
            return {
                ...state,
                products: {
                    instant: {}
                }
            };
        }
        case ADD_TO_CART: {
            const product = action.payload;
            const newCart = addProductToCart(product, state.products.instant);
            return {
                ...state,
                products: {
                    instant: newCart
                }
            };
        }
        case REMOVE_FROM_CART: {
            const product = action.payload;
            const newCart = removeProductFromCart(
                product,
                state.products.instant
            );
            return {
                ...state,
                products: {
                    instant: newCart
                }
            };
        }
        case UPDATE_CART: {
            const merge = mergeCarts(action.payload, state.products);
            return {
                ...state,
                products: merge.netCart,
                itemCountUp: merge.itemCountUp,
                itemCountDown: merge.itemCountDown
            };
        }
        default:
            return state;
    }
};
