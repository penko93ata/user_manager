import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  // here add all reducers as object properties
  profile: profileReducer,
  auth: authReducer
});
