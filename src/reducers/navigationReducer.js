import {
    TOGGLE_MENU_OPEN,
    TOGGLE_MENU_CLOSE
} from '../actions/navigationActions';

const initialState = {
    isMenuOpen: false,
    toggleState: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TOGGLE_MENU_OPEN:
            return {
                ...state,
                isMenuOpen: true,
                toggleState: !state.toggleState
            };
        case TOGGLE_MENU_CLOSE:
            return {
                ...state,
                isMenuOpen: false,
                toggleState: !state.toggleState,
            };
        default:
            return state;
    }
}
