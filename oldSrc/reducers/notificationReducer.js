import { NEXT_NOTIFICATION } from '../actions/notificationActions';

export default function(state = {}, action) {
    switch (action.type) {
        case NEXT_NOTIFICATION:
            return { index: action.payload };
        default:
            return state;
    }
}
