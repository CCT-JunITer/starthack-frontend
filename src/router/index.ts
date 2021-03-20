import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Map from '../views/Map.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Map',
    component: Map,
  },
  {
    path: '/vote',
    name: 'vote',
    component: () => import('../views/vote/VoteView.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
