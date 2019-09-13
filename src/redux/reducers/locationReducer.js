import { combineReducers } from 'redux';

const markers = (state = [], action) => {
	switch (action.type) {
		case 'SET_LOCATIONS':
			return action.payload;
		default:
			return state;
	}
};

const locationTypes = (state = [], action) => {
	switch (action.type) {
		case 'SET_LOCATION_TYPES':
			return action.payload;
		default:
			return state;
	}
};

const displayedLocation = (state = {}, action) => {
	switch (action.type) {
		case 'SET_DISPLAYED_LOCATION':
			return action.payload;
		case 'CLEAR_DISPLAYED_LOCATION':
			return {}
		default:
			return state;
	}
}
//will be on redux state at: state.locations.markers
//state.locations.locationTypes
//state.locations.locationDetails
export default combineReducers({
	markers,
	locationTypes,
	displayedLocation
});
