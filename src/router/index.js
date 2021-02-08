import Vue from 'vue';
import VueRouter from 'vue-router';
import About from '@/views/About.vue';
import Movies from '@/views/Movies.vue';
import Contact from '@/views/Contact.vue';
import People from '@/views/People.vue';

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
		path: '/contact',
		name: 'Contact',
		component: Contact,
	},
	{
		path: '/people',
		name: 'People',
		component: People,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
