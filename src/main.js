// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import api from './api/api';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import '@/assets/iconfont/iconfont.css';
import 'babel-polyfill';

Vue.use(ElementUI, { size: 'small' });

Vue.config.productionTip = false;

// Axois Api Service
Vue.prototype.api = api;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
