import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import loader from "vue-ui-preloader";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(loader);

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
