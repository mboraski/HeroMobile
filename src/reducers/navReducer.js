import AppNavigator from '../navigations/MenuNavigator';
import { SIGNOUT_SUCCESS } from '../actions/authActions';
import { reset, GO_MAIN } from '../actions/navigationActions';

const authResetState = AppNavigator.router.getStateForAction(reset('auth'));
const mainResetState = AppNavigator.router.getStateForAction(reset('main'));

const initialState = authResetState;

const navReducer = (state = initialState, action) => {
    const nextState = AppNavigator.router.getStateForAction(
        action,
        state
    );
    switch (action.type) {
        case SIGNOUT_SUCCESS:
            return authResetState;
        case GO_MAIN:
            return mainResetState;
        default:
            // Simply return the original `state` if `nextState` is null or undefined.
            return nextState || state;
    }
};

export default navReducer;
