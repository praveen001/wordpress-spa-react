import { renderRoutes } from 'react-router-config';
import BlogList from './containers/BlogList';
import BlogPost from './containers/BlogPostContainer';
import React from 'react';

class test extends React.Component {
  render() {
    return <p>Test</p>
  }
}

const routes = [
  {
    component: AppRoot,
    routes: [
      {
        path: '/',
        component: test
      }
    ]
  }
];

const AppRoot = ({route}) => {
  console.log(props);
  return (
    <div>
      <h1>Root</h1>
      {/* {renderRoutes(route.routes)} */}
    </div>
  )
}

export {
  routes,
  AppRoot
}