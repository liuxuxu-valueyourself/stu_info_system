import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '../src/assets/main.css';

import VCharts from 'v-charts';

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false;

Vue.use(VCharts)
Vue.use(VueAxios, axios)
Vue.use(Antd);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
