import { combineReducers } from 'redux';

//all markers in database
const markerList = (state = [{ id: null }], action) => {
	switch (action.type) {
		case 'SET_MARKER_LIST':
			return action.payload;
		case 'CLEAR_MARKERS':
			return [];
		default:
			return state;
	}
};

const apiMarkerList = (state = [], action) => {
	switch (action.type) {
		case 'SET_API_MARKERS':
			return action.payload;
		case 'CLEAR_MARKERS':
			return [];
		default:
			return state;
	}
};
//marker types available
const markerTypes = (state = [], action) => {
	switch (action.type) {
		case 'SET_MARKER_TYPES':
			return action.payload;
		default:
			return state;
	}
};
//sets filters on what markers to show.  default 1 and 2 are pre-set for bike parking racks and fixing stations
//will be on state as state.markers.markerList and state.markers.markerTypes
export default combineReducers({
	markerList,
	apiMarkerList,
	markerTypes
});
