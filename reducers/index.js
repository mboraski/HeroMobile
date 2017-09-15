import { combineReducers } from 'redux';
import auth from './authReducer';
import menu from './menuReducer'

export default combineReducers({
  auth,
  menu
});
