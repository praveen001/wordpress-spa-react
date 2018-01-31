import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter, push } from 'react-router-redux';
import renderHTML from 'react-render-html';

import Theme from './Theme.js';
import Release from './release.json';
import Axios from './Axios';
import {BrowserRouter} from 'react-router-dom';
import { Store } from './Store';

// Styles
import Style from './index.css';

// Material UI
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

// Containers
import Async from './components/Async/Async';
import Layout from './components/Layout/Layout';
const BlogListContainer = () => import('./containers/BlogList');
const BlogPostContainer = () => import('./containers/BlogPostContainer');

const theme = createMuiTheme(Theme);

ReactDOM.render((
  <Provider store={Store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Layout>
          <Switch>    
            <Route exact path='/' component={(props) => <Async load={BlogListContainer} props={props} />} />
            <Route path='/:slug' component={(props) => <Async load={BlogPostContainer} props={props} />} />
          </Switch>
        </Layout>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>
), document.getElementById('app'))
