import 'babel-polyfill';
import 'font-awesome/css/font-awesome.css';

import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
import store from './store';

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
