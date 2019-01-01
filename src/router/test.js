export default [
  {
    path: '/test',
    component: () => import('@modules/test/test.vue')
  },
  {
    path: '/test/computed',
    component: () => import('@modules/test/computed.vue')
  },
  {
    path: '/test/ref',
    component: () => import('@modules/test/ref_test.vue')
  },
  {
    path: '/test/slot',
    component: () => import('@modules/test/slot_test.vue')
  },
  {
    path: '/test/watch_when_created',
    component: () => import('@modules/test/watch_when_created.vue')
  },
  {
    path: '/test/event-flow',
    component: () => import('@modules/test/event-flow.vue')
  },
  {
    path: '/user/:id',
    component: () => import('@modules/test/user.vue'),
    props: true
  }
];
