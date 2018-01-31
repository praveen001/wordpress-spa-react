import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
// import { ConnectedRouter, push } from 'react-router-redux';
// import renderHTML from 'react-render-html';

// import { History, Store } from './Store';
// import Theme from './Theme.js';
// import Release from './release.json';
// import Axios from './Axios';
// import {BrowserRouter} from 'react-router-dom';

// import { renderRoutes } from 'react-router-config'

// console.log(renderRoutes);

export function renderRoutes(routes) {
  return routes.map((route, i) => {
    return <Route key={i} path={route.path} component={(props) => <route.component {...props} route={route} />} />
  });
}

console.log(renderRoutes);

const Root = (props) => {
  console.log(props);
  return <div>
    <h1>Root</h1>
    {/* child routes won't render without this */}
    {renderRoutes(props.route.routes)}
  </div>
}

const Home = ({ route }) => (
  <div>
    <h2>Home</h2>
  </div>
)

const Child = ({ route }) => (
  <div>
    <h2>Child</h2>
    {/* child routes won't render without this */}
    {renderRoutes(route.routes, { someProp: 'these extra props are optional' })}
  </div>
)

const GrandChild = () => (
  <div>
    <h3>Grand Child</h3>
  </div>
)


export const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/child/:id',
        component: Child,
        routes: [
          {
            path: '/child/:id/grand-child',
            component: GrandChild
          }
        ]
      }
    ]
  }
]


// ReactDOM.render((
//   <BrowserRouter>
//     {/* kick it all off with the root route */}
    
//     <div>{renderRoutes(routes)}</div>
//   </BrowserRouter>
// ), document.getElementById('app'))
