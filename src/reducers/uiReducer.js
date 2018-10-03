import {
    TOGGLE_SEARCH,
    OPEN_CUSTOMER_POPUP,
    CLOSE_CUSTOMER_POPUP,
    SHOW_FEEDBACK_FORM,
    HIDE_FEEDBACK_FORM,
    FIRST_TIME_OPENED,
    DROPDOWN_ALERT
} from '../actions/uiActions';

const initialState = {
    headerVisible: true,
    searchVisible: false,
    customerPopupVisible: false,
    feedbackFormVisible: false,
    firstTimeOpened: true,
    dropdownAlertVisible: false,
    dropdownAlertText: ''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_SEARCH:
            return {
                ...state,
                headerVisible: !state.headerVisible,
                searchVisible: !state.searchVisible
            };
        case OPEN_CUSTOMER_POPUP:
            return {
                ...state,
                customerPopupVisible: true
            };
        case CLOSE_CUSTOMER_POPUP:
            return {
                ...state,
                customerPopupVisible: false
            };
        case SHOW_FEEDBACK_FORM:
            return {
                ...state,
                feedbackFormVisible: true
            };
        case HIDE_FEEDBACK_FORM:
            return {
                ...state,
                feedbackFormVisible: false
            };
        case FIRST_TIME_OPENED:
            return {
                ...state,
                firstTimeOpened: false
            };
        case DROPDOWN_ALERT:
            return {
                ...state,
                dropdownAlertVisible: action.payload.visible,
                dropdownAlertText: action.payload.text
            };
        default:
            return state;
    }
}
