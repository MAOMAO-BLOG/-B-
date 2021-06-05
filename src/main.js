import Vue from 'vue';
import VCharts from 'v-charts'
import App from './App.vue';
import router from './router';
import store from './store/index.js';
import './plugins/ant-design-vue';
import '@/assets/css/reset.less';
import API from './api';
import cookie from './cookie';
Vue.use(VCharts);
Vue.prototype.$api=API;
Vue.prototype.$cookie=cookie;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
