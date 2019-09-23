const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {...state, ...action.payload};
    case 'SET_USER_FAVORITES':
      return { ...state, saved_locations: action.payload }
    case 'SET_USER_CREATED':
      return {...state, created_locations: action.payload}
    case 'SET_CURRENT_LOCATION':
      return {...state, lat: action.payload.lat, lng: action.payload.lng}
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at: state.user
export default userReducer;
