const selectedMarker = (
	state = {
		id: null,
		lat: null,
		lng: null,
		createdById: null,
		avgRating: null,
		userRating: null
	},
	action
) => {
	switch (action.type) {
		case 'SET_SELECTED_MARKER':
			return action.payload;
		case 'SET_SELECTED_MARKER_COMMENTS':
			return { ...state, comments: action.payload };
		case 'SET_SELECTED_MARKER_AVG_RATING':
			return { ...state, avgRating: action.payload };
		case 'SET_SELECTED_MARKER_USER_RATING':
			return { ...state, userRating: action.payload };
		case 'UNSET_USER':
			return {
				id: null,
				lat: null,
				lng: null,
				createdById: null,
				avgRating: null,
				userRating: null
			};
		case 'CLEAR_SELECTED_MARKER':
			return {
				id: null,
				lat: null,
				lng: null,
				createdById: null,
				avgRating: null,
				userRating: null
			};
		default:
			return state;
	}
};
//will be on redux state at: state.selectedMarker
export default selectedMarker;
