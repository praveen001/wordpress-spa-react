import { createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import RootReducer from './RootReducer';

const History = createHistory();
const middleware = routerMiddleware(History);

const defaultState = {};

const Store = createStore(RootReducer, defaultState, compose(applyMiddleware(middleware), applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f) );

module.exports = {
  Store,
  History
};