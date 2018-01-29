import axios from 'axios';

import { Store } from './Store';

var baseURL = window.location.hostname.indexOf('production.com') == -1 ? 'https://api.sourceclone.com' : 'https://api.sourceclone.com'

const instance = axios.create({
  baseURL
});

instance.interceptors.request.use(function(config) {
  // var user = Store.getState().user;
  // if (user.is_authenticated) {
    // config.headers['Authorization'] = user.token;
  // }
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function(response) {
  return response;
}, function(error) {
  return Promise.reject(error);
});

export default instance;