import Vue from 'vue';
import VueRouter from 'vue-router';
import About from '../views/About.vue';
import Movies from '../views/Movies.vue';
import Users from '../views/Users.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'About',
    component: About,
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies,
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
  },
  {
    path: '*',
    component: About,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
