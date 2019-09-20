import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import markers from './markerReducer'
import map from './mapReducer'
import mapCenter from './mapCenterReducer'
import selectedMarker from './selectedMarkerReducer'
import myLocations from './myLocationReducer'
import listView from './viewedListReducer'

// rootReducer is the primary reducer -- it bundles up all of the other reducers
// This is imported in index.js as rootSaga

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username and lat and lng of user if someone is logged in
  markers, //will have an array of all locations stored in database and list fo marker types
  map, // will contain an object representing the current google map
  mapCenter, // will have an object {lat: num, lng: num} for center coordinates
  selectedMarker, //object containing details of currently selected marker
  myLocations, // contains mySaved and myCreated
  listView
});

export default rootReducer;
