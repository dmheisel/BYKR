import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import locations from './locationReducer'
import mapCenter from './mapReducer'
import rating from './ratingReducer'
import comments from './commentReducer'

// rootReducer is the primary reducer -- it bundles up all of the other reducers
// This is imported in index.js as rootSaga

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username and lat and lng of user if someone is logged in
  locations, //will have an array of all locations stored in database
  mapCenter, // will have an object {lat: num, lng: num} for center coordinates
  rating, // will be a number of the current rating on the displayed site
  comments //will be an array of all comments for the displayed site
});

export default rootReducer;
