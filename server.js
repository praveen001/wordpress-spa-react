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
import compression from 'compression';
import RootReducer from './app/RootReducer';
import { routes } from './app/Routes';
import Theme from './app/Theme';
import Layout from './app/components/Layout/Layout';

const app = express();

app.set('views', 'dist');
app.set('view engine', 'ejs');
app.use('/dist', express.static('dist'));
app.use(compression());

app.get('/', (req, res) => {
  buildUI(req).then(data => {
    let { content, state, css } = data;
    res.render('server.ejs', { title: 'Source clone', content, state, css });
  });
});

app.get('/:slug', (req, res) => {
  buildUI(req).then(data => {
    let { content, state, stateString, css } = data;
    res.render('server.ejs', { title: state.post.post.title.rendered, content, state: stateString, css });
  });
});


function buildUI(req) {
  return new Promise((resolve, reject) => {
    var sheetsRegistry = new SheetsRegistry(),
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
      var content, state, css, stateString;
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
      stateString = JSON.stringify(state).replace(/</g, '\\u003c');
      resolve({content, state, stateString, css});
    });
  });
}

app.listen(8888);