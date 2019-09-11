const location = (state = [], action) => {
  switch (action.type) {
    case 'SET_LOCATIONS':
      return action.payload
    default:
      return state
  }
}
//will be on redux state at state.location
export default location;
