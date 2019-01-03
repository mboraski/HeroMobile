export const ADD_TO_CART = 'add_to_cart';
export const REMOVE_FROM_CART = 'remove_from_cart';
export const SET_CURRENT_LOCATION = 'set_current_location';
export const UPDATE_CART = 'update_cart';
export const CLEAR_CART = 'clear_cart';

export const clearCart = () => dispatch => dispatch({ type: CLEAR_CART });

export const addToCart = product => ({
    type: ADD_TO_CART,
    payload: product
});

export const removeFromCart = product => ({
    type: REMOVE_FROM_CART,
    payload: product
});

export const setCurrentLocation = (address, region) => ({
    type: SET_CURRENT_LOCATION,
    payload: {
        address,
        region
    }
});

export const updateCart = products => ({
    type: UPDATE_CART,
    payload: products
});
