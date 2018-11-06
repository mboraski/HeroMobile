import { SET_DELIVERY_NOTES } from '../actions/checkoutActions';

export const initialState = {
    notes: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_DELIVERY_NOTES:
            return {
                notes: action.payload
            };
        default:
            return state;
    }
};
