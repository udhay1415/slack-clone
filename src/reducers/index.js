import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ChannelReducer from './ChannelReducer';

export default combineReducers({
  auth: AuthReducer,
  channel: ChannelReducer
})