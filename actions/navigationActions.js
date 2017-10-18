export const TOGGLE_MENU_OPEN = 'nav_toggle_menu_open';
export const TOGGLE_MENU_CLOSE = 'nav_toggle_menu_close';

export const openToggle = () => dispatch => {
    dispatch({ 
        type: TOGGLE_MENU_OPEN,
    });
};

export const closeToggle = () => dispatch => {
    dispatch({ 
        type: TOGGLE_MENU_CLOSE,
    });
};
