import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

Vue.component('v-select', vSelect);

const eventHub = new Vue();

export default eventHub;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
