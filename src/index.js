import Vue from 'vue';
import Router from 'vue-router';
import App from './app.vue';
import NotFound from './not-found';

Vue.use(Router);


const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/test',
      component: () => import('./test.vue'),
    },
    {
      path: '/user/:id',
      component: () => import('./user.vue'),
      props: true,
    },
    {
      path: '*',
      component: NotFound,
    }
  ]
});

const root = new Vue({
  router,
  el: '#app',
  render: (h) => {
    console.log('render');
    return h(App);
  },
});