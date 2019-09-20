const viewedListReducer = (state = 0, action) => {
	switch (action.type) {
		case 'SET_VIEW':
			return action.payload;
		default:
			return state;
	}
};

export default viewedListReducer
