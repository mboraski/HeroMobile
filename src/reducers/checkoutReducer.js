import { SET_DELIVERY_NOTES } from '../actions/checkoutActions';
import { SIGNOUT_SUCCESS } from '../actions/authActions';

export const initialState = {
    notes: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGNOUT_SUCCESS:
            return initialState;
        case SET_DELIVERY_NOTES:
            return {
                notes: action.payload
            };
        default:
            return state;
    }
};
