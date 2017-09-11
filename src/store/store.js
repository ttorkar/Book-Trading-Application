import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import history from '../history';
import reducer from '../reducers/index';

const routeMiddleware = routerMiddleware(history);

let store = createStore(
    reducer,
    applyMiddleware(routeMiddleware, thunk)
);

export default store;