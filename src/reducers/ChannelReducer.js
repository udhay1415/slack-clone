const INITIAL_STATE = {
  currentChannel: ''
}

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case 'STORE_CURRENT_CHANNEL':
      return { ...state, currentChannel: action.payload };  
    default:
      return state;
  }
}