import { NavigationActions } from 'react-navigation';

import AppNavigator from '../navigations/MenuNavigator';

const initialState = AppNavigator.router.getStateForAction(NavigationActions.init());

const navReducer = (state: State = initialState, action: any): State => {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
};

export default navReducer;
