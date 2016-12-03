import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import VueResource from 'vue-resource';
import router from './route';

Vue.use(ElementUI);
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
