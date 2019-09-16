const myLocationReducer = (state = {}, action) => {
	switch (action.type) {
		case 'SET_USER_SAVED_LOCATIONS':
			return { ...state, saved: action.payload };
		case 'SET_USER_CREATED_LOCATIONS':
			return { ...state, created: action.payload };
		case 'CLEAR_USER_LOCATIONS':
			return {};
		default:
			return state;
	}
};

export default myLocationReducer;
