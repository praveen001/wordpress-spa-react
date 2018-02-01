import { createStore, applyMiddleware, compose } from 'redux';
// import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import RootReducer from './RootReducer';

// const History = createHistory();
// const middleware = routerMiddleware(History);
var defaultState, Store;
if (typeof window != 'undefined') {
  console.log('has window', window.__INITIAL_STATE__);
  defaultState = window.__INITIAL_STATE__;
  Store = createStore(RootReducer, defaultState, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f));
} else {
  console.log('empty');
  defaultState = {};
  Store = createStore(RootReducer, defaultState, compose(applyMiddleware(thunk)));
}

module.exports = {
  Store
};