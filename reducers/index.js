import { combineReducers } from 'redux';
import auth from './authReducer';
import header from './navigationReducer';
import nav from './navReducer';

export default combineReducers({
  auth,
  header,
  nav,
});
