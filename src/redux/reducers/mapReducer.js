const mapReducer = (state = {}, action) => {
	switch (action.type) {
		case 'SET_MAP':
      return action.payload;
    case 'SET_CENTER':
      console.log(state, action.payload)
      state.panTo(action.payload)
      return state;
		case 'CLEAR_MAP':
			return {};
		default:
			return state;
	}
};

export default mapReducer;
