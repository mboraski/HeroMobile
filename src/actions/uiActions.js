export const TOGGLE_SEARCH = 'ui_toggle_search';
export const OPEN_CUSTOMER_POPUP = 'ui_open_customer_popup';
export const CLOSE_CUSTOMER_POPUP = 'ui_close_customer_popup';
export const SHOW_FEEDBACK_FORM = 'show_feedback_form';
export const HIDE_FEEDBACK_FORM = 'hide_feedback_form';
export const FIRST_TIME_OPENED = 'first_time_opened';
export const DROPDOWN_ALERT = 'dropdown_alert';

export const toggleSearch = () => dispatch => {
    dispatch({ type: TOGGLE_SEARCH });
};

export const openCustomerPopup = () => ({ type: OPEN_CUSTOMER_POPUP });
export const closeCustomerPopup = () => ({ type: CLOSE_CUSTOMER_POPUP });

export const showFeedbackForm = () => ({ type: SHOW_FEEDBACK_FORM });
export const hideFeedbackForm = () => ({ type: HIDE_FEEDBACK_FORM });

export const setFirstTimeOpened = () => ({ type: FIRST_TIME_OPENED });

export const dropdownAlert = (visible, text) => ({
    type: DROPDOWN_ALERT,
    payload: { visible, text }
});
