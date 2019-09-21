const mapCenterReducer = (state = {}, action) => {
	switch (action.type) {
		case 'SET_CENTER':
			return action.payload;
		case 'CLEAR_CENTER':
			return {};
		case 'UNSET_USER':
			return {};
		default:
			return state;
	}
};

export default mapCenterReducer;
