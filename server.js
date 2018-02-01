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

app.set('views', './dist');
app.set('view engine', 'ejs');
app.use('/dist', express.static('dist'));

app.get('*', (req, res) => {
  let sheetsRegistry = new SheetsRegistry(),
    generateClassName = createGenerateClassName(),
    context = {},
    theme = createMuiTheme(Theme),
    store = createStore(RootReducer),
    branch = matchRoutes(routes, req.url), 
    promises = [];

  promises = branch.map(({ route, match }) => {
    let fetchData = route.component.fetchData;
    return fetchData instanceof Function ? fetchData(store.dispatch, match.params) : Promise.resolve(null);
  });

  Promise.all(promises).then(([...response]) => {
    let content, state, css;
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
    // res.send(renderFullPage('Source Clone', content, state, css));
    state = JSON.stringify(state).replace(/</g, '\\u003c');
    res.render('server.ejs', { title: 'Source Clone', content, state, css })
  });
});

app.listen(3000);