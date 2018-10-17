import Vue from 'vue';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './app.vue';
import NotFound from './not-found';

Vue.use(Router);
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

const router = new Router({
  // mode: 'history',
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
      path: '/test/slot',
      component: () => import('./test/slot_test.vue')
    },
    {
      path: '/test/watch_when_created',
      component: () => import('./test/watch_when_created.vue')
    },
    {
      path: '/test/event-flow',
      component: () => import('./test/event-flow.vue')
    },
    {
      path: '/element/dialog_select',
      component: () => import('./elementui/dialog_select.vue')
    },
    {
      path: '/element/form',
      component: () => import('./elementui/form.vue')
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
      path: '/router',
      component: () => import('./router-test/index.vue')
    },
    {
      name: 'router-params',
      path: '/router/params/:id',
      component: () => import('./router-test/params.vue'),
      props: true
    },
    {
      name: 'router-props',
      path: '/router/props',
      component: () => import('./router-test/props.vue'),
      props: (route) => ({ id: route.query.id })
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
