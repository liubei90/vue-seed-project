import Vue from 'vue';
import Router from 'vue-router';
import NotFound from '@/not-found';

import elementui from './elementui';
import formSchema from './form-schema';
import routerTest from './router-test';
import test from './test';
import todolist from './todolist';
import vueinstance from './vueinstance';
import echarts from './echarts';
import video from './video';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    ...elementui,
    ...formSchema,
    ...routerTest,
    ...test,
    ...todolist,
    ...vueinstance,
    ...echarts,
    ...video,
    {
      path: '*',
      component: NotFound
    }
  ]
});
