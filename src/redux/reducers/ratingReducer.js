const rating = (state = {}, action) => {
	switch (action.type) {
		case 'SET_USER_RATING':
      return action.payload;
    case 'CLEAR_USER_RATING':
      return {}
		default:
			return state;
	}
};

export default rating
