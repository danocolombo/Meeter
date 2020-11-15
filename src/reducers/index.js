import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import person from './person';
import group from './group';
import gathering from './gathering';

export default combineReducers({
    alert,
    auth,
    profile,
    group,
    person,
    gathering,
});
