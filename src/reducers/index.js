import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import allBooks from './allBooks';
import userBooks from './userBooks';
import incRequests from './incRequests';
import outRequests from './outRequests';

const rootReducer = combineReducers({user, allBooks, userBooks, incRequests, outRequests, router: routerReducer});

export default rootReducer;