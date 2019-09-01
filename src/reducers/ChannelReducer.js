const INITIAL_STATE = {
  currentChannel: '',
  isPrivateChannel: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'STORE_CURRENT_CHANNEL':
      return { ...state, currentChannel: action.payload }; 
    case 'SET_PRIVATE_CHANNEL':
      return { ...state, isPrivateChannel: action.payload }; 
    default:
      return state;
  }
}