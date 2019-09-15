import { combineReducers } from 'redux';

const markerList = (state = [{id:null}], action) => {
	switch (action.type) {
		case 'SET_MARKER_LIST':
			return action.payload;
		default:
			return state;
	}
};

const markerTypes = (state = [], action) => {
	switch (action.type) {
		case 'SET_MARKER_TYPES':
			return action.payload;
		default:
			return state;
	}
};
//will be on state as state.markers.markerList and state.markers.markerTypes
export default combineReducers({
  markerList,
  markerTypes
});
