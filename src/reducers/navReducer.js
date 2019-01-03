// import AppNavigator from '../navigations/MenuNavigator';
// import { AUTH_RESET_STATE } from '../actions/authActions';
// import { reset } from '../actions/navigationActions';
//
// const authResetState = AppNavigator.router.getStateForAction(reset('auth'));
//
// const initialState = authResetState;
//
// const navReducer = (state = initialState, action) => {
//     const nextState = AppNavigator.router.getStateForAction(action, state);
//     switch (action.type) {
//         case AUTH_RESET_STATE:
//             return authResetState;
//         default:
//             // Simply return the original `state` if `nextState` is null or undefined.
//             return nextState || state;
//     }
// };
//
// export default navReducer;
