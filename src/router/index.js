import Vue from 'vue';
import VueRouter from 'vue-router';
import About from '../views/About.vue';
import Movies from '../views/Movies.vue';
import Mandala from '../views/Mandala.vue';
import CountingGame from '../views/CountingGame.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'About',
    component: About
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies
  },
  {
    path: '/mandala',
    name: 'Mandala',
    component: Mandala
  },
  {
    path: '/counting-game',
    name: 'CountingGame',
    component: CountingGame
  },
  {
    path: '*',
    component: About
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
