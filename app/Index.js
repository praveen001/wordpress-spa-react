import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { ConnectedRouter, push } from 'react-router-redux';

import { History, Store } from './Store';
import Theme from './Theme.js';
import Release from './release.json';

// Styles
import Style from './index.css';

// Material UI
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

// Containers
import Layout from './components/Layout/Layout';
import BlogListContainer from './containers/BlogList';
import BlogPostContainer from './containers/BlogPostContainer';

const theme = createMuiTheme(Theme);

ReactDOM.render(
  <Provider store={Store}>
    <ConnectedRouter history={History}>
      <MuiThemeProvider theme={theme}>
        <Layout>
          <Switch>
            <Route exact path='/' component={BlogListContainer} />
            <Route path='/:slug' component={BlogPostContainer} />
          </Switch>
        </Layout>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>, 
  document.getElementById('app')
);