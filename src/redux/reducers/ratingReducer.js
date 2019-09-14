const rating = (state = 0, action) => {
	switch (action.type) {
		case 'SET_USER_RATING':
      return action.payload;
    case 'CLEAR_USER_RATING':
      return 0
		default:
			return state;
	}
};

export default rating
