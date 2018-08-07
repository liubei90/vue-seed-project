import Vue from 'vue';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './app.vue';
import NotFound from './not-found';

Vue.use(Router);
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/test',
      component: () => import('./test/test.vue')
    },
    {
      path: '/test/computed',
      component: () => import('./test/computed.vue')
    },
    {
      path: '/test/ref',
      component: () => import('./test/ref_test.vue')
    },
    {
      path: '/element/dialog_select',
      component: () => import('./elementui/dialog_select.vue')
    },
    {
      path: '/vueinstance/create-and-computed',
      component: () => import('./vueinstance/createAndComputed.vue')
    },
    {
      path: '/user/:id',
      component: () => import('./test/user.vue'),
      props: true
    },
    {
      path: '/todolist',
      component: () => import('./todolist/index.vue')
    },
    {
      path: '/form',
      component: () => import('./form-schema/index.vue')
    },
    {
      path: '/schema',
      component: () => import('./form-schema/operate-schema.vue')
    },
    {
      path: '*',
      component: NotFound
    }
  ]
});

/* eslint-disable no-unused-vars */
const root = new Vue({
  router,
  el: '#app',
  render: (h) => {
    console.log('render');
    return h(App);
  }
});
