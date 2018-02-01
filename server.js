import express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { renderRoutes, matchRoutes } from 'react-router-config';
import StaticRouter from 'react-router-dom/StaticRouter';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from 'material-ui/styles';
import { Switch } from 'react-router-dom';

import RootReducer from './app/RootReducer';
import { routes } from './app/Routes';
import Theme from './app/Theme';
import Layout from './app/components/Layout/Layout';

const app = express();

app.use('/dist', express.static('dist'));

app.get('*', (req, res) => {
  let sheetsRegistry = new SheetsRegistry(),
    generateClassName = createGenerateClassName(),
    context = {},
    theme = createMuiTheme(Theme),
    store = createStore(RootReducer),
    branch = matchRoutes(routes, req.url), 
    promises = [],
    state,
    css,
    content;

  promises = branch.map(({ route, match }) => {
    let fetchData = route.component.fetchData;
    return fetchData instanceof Function ? fetchData(store.dispatch, match.params) : Promise.resolve(null);
  });

  Promise.all(promises).then(([...response]) => {
    content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme}>
              <Layout>
                <Switch>
                  {renderRoutes(routes)}
                </Switch>
              </Layout>
            </MuiThemeProvider>
          </JssProvider>
        </StaticRouter>
      </Provider>
    );
    state = store.getState();
    css = sheetsRegistry.toString();
    res.send(renderFullPage('Source Clone', content, state, css));
  });
});

function renderFullPage(title, content, state, css) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8" />
        <meta name="google-site-verification" content="Ks0N9bl1QPvA79fZNsAfWuT5AHR6tmW-ScAXNzF0nQg" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i" rel="stylesheet">
        <script src="https://apis.google.com/js/platform.js"></script>
        <link href="/dist/styles/style.css" rel="stylesheet">
      </head>
      <body>
        <div id="app">${content}</div>
        <style id="jss-server-side">${css}</style>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')}
        </script>
        <script type="text/javascript" src="/dist/vendor.bec601537da3420d0ac0.js"></script>
        <script type="text/javascript" src="/dist/main.bec601537da3420d0ac0.js"></script></body>
      </body>
    </html>
    `
}

app.listen(3000);