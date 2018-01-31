import React from 'react';
import { Route } from 'react-router-dom';
import BlogList from './containers/BlogList';
import BlogPost from './containers/BlogPostContainer';

const AppRoot = ({route}) => {
  return (
    <div>
      {renderClientRoutes(route.routes)}
    </div>
  )
}

function renderClientRoutes(routes) {
  return routes.map((route, i) => {
    return <Route key={i} path={route.path} component={(props) => <route.component {...props} route={route} />} />
  });
}

const routes = [
  {
    component: AppRoot,
    routes: [
      {
        path: '/',
        exact: true,
        component: BlogList
      }, {
        path: '/:slug',
        component: BlogPost
      }
    ]
  }
];

export {
  routes,
  AppRoot
}