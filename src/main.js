import Vue from 'vue';
import App from './App.vue';
import router from './router';

const eventHub = new Vue();

export default eventHub;

new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app');
