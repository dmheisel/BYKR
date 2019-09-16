const mapCenterReducer = (state = {}, action) => {
	switch (action.type) {
		case 'SET_CENTER':
			return action.payload;
		case 'UNSET_USER':
			return {};
		default:
			return state;
	}
};

export default mapCenterReducer;
