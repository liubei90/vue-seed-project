export default [
  {
    path: '/router',
    component: () => import('@modules/router-test/index.vue')
  },
  {
    name: 'router-params',
    path: '/router/params/:id',
    component: () => import('@modules/router-test/params.vue'),
    props: true
  },
  {
    name: 'router-props',
    path: '/router/props',
    component: () => import('@modules/router-test/props.vue'),
    props: (route) => ({ id: route.query.id })
  }
];
