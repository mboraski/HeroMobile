import {
    OPEN_FEEDBACK_REQUEST,
    OPEN_FEEDBACK_SUCCESS,
    OPEN_FEEDBACK_ERROR,
    OPEN_REQUEST_POPUP,
    CLOSE_REQUEST_POPUP
} from '../actions/feedbackActions';

const initialState = {
    pending: false,
    error: {},
    requestPopupVisible: false,
    product: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case OPEN_REQUEST_POPUP:
            return {
                ...state,
                requestPopupVisible: true,
                product: action.payload
            };
        case CLOSE_REQUEST_POPUP:
            return {
                ...state,
                requestPopupVisible: false,
                product: {}
            };
        case OPEN_FEEDBACK_REQUEST:
            return {
                ...state,
                pending: true
            };
        case OPEN_FEEDBACK_SUCCESS:
            return {
                ...state,
                pending: false
            };
        case OPEN_FEEDBACK_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload
            };
        default:
            return state;
    }
}
