import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import locations from './locationReducer'

// rootReducer is the primary reducer -- it bundles up all of the other reducers
// This is imported in index.js as rootSaga

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username and lat and lng of user if someone is logged in
  locations //will have an array of all locations stored in database
});

export default rootReducer;
