import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import BlogListReducer from './reducers/BlogListReducers';
import BlogPostReducer from './reducers/BlogPostReducers';

function rootReducer(state = {}, action) {
  return state;
}

export default combineReducers({
  rootReducer,
  list: BlogListReducer,
  post: BlogPostReducer
});