import {
    TOGGLE_MENU_OPEN,
    TOGGLE_MENU_CLOSE
} from '../actions/navigationActions';
import { SIGNOUT_SUCCESS } from '../actions/authActions';

const initialState = {
    isMenuOpen: false,
    toggleState: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SIGNOUT_SUCCESS:
            return initialState;
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
                toggleState: !state.toggleState
            };
        default:
            return state;
    }
}
