const mapCenterReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CENTER':
      return action.payload
    default:
      return state
  }
}

export default mapCenterReducer
