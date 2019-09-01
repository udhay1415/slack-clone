const INITIAL_STATE = {
  loading: false,
  user: ''
}

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case 'USER_CHECK':
      return { ...state, loading: true };
    case 'USER_CHECK_SUCCESS':
      return { ...state, user: action.payload, loading: false };
    case 'USER_CHECK_FAIL':
      return { ...state, loading: false, user: '' };
    
    case 'STORE_USER':
      return { ...state, user: action.payload };
        
    default:
      return state;
  }
}