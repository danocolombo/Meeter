import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import person from './person';
import group from './group';
import gathering from './gathering';
import post from './post';
import meeter from './meeter';
import meeting from './meeting';
import client from './client';

export default combineReducers({
    alert,
    auth,
    client,
    profile,
    group,
    person,
    gathering,
    post,
    meeter,
    meeting,
});
