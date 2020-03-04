import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import person from './person';
import gathering from './gathering';
import post from './post';

export default combineReducers({
  alert,
  auth,
  profile,
  person,
  gathering,
  post
});
