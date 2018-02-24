import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './authReducer';
import header from './navigationReducer';
import nav from './navReducer';

export default combineReducers({
  auth,
  form,
  header,
  nav,
});
