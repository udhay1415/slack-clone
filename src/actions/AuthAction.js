import firebase from '../firebase';
import history from '../History';

export const userCheck = () => {
  return (dispatch) => {
    dispatch({ type: 'USER_CHECK' });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        history.push('/');
        console.log(user);
        dispatch({ type: 'USER_CHECK_SUCCESS', payload: user });
      } else {
        history.push('/login');
        dispatch({ type: 'USER_CHECK_FAIL' });
      }
    })
  }
}