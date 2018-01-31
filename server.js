import express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import RootReducer from './app/RootReducer';
// import BlogList from './app/containers/BlogList';
// import { Store } from './app/Store';
import { renderRoutes } from 'react-router-config';
import StaticRouter from 'react-router-dom/StaticRouter';
import { routes } from './app/Index';

const app = express();

app.use(express.static('dist'))

app.get('*', (req, res) => {

  let context = {};

  const content = renderToString(

    <StaticRouter location={req.url} context={context}>
      {renderRoutes(routes)}
    </StaticRouter>

  )

  res.send(renderFullPage('Express', false, content))

});

function renderFullPage(title, data, content) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <div id="app">${content}</div>
        <script type="text/javascript" src="/dist/vendor.f28112e2def0eeb3a47b.js"></script>
        <script type="text/javascript" src="/dist/main.f28112e2def0eeb3a47b.js"></script>
      </body>
    </html>
    `
}

app.listen(3000);