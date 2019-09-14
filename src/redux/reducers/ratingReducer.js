const rating = (state = 0, action) => {
	switch (action.type) {
		case 'SET_RATING':
      return action.payload;
    case 'CLEAR_RATING':
      return 0
		default:
			return state;
	}
};

export default rating
