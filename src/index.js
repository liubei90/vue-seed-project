import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './app.vue';
import router from './router';

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

/* eslint-disable no-unused-vars */
const root = new Vue({
  router,
  el: '#app',
  render: (h) => {
    console.log('render');
    return h(App);
  }
});
