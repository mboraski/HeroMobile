import { NEXT_NOTIFICATION } from '../actions/notificationActions';
import { SIGNOUT_SUCCESS } from '../actions/authActions';

const initialState = {
    index: 0
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SIGNOUT_SUCCESS:
            return initialState;
        case NEXT_NOTIFICATION:
            return {
                ...state,
                index: action.payload
            };
        default:
            return state;
    }
}
