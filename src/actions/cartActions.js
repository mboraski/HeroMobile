export const SET_CURRENT_LOCATION = 'set_current_location';
export const UPDATE_CART = 'update_cart';

export const setCurrentLocation = (address, region) => ({
    type: SET_CURRENT_LOCATION,
    payload: {
        address,
        region
    }
});

export const updateCart = (products) => ({
    type: UPDATE_CART,
    payload: products
});
