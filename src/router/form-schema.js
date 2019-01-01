export default [
  {
    path: '/form',
    component: () => import('@modules/form-schema/index.vue')
  },
  {
    path: '/schema',
    component: () => import('@modules/form-schema/operate-schema.vue')
  }
];
