import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from 'axios'
Vue.config.productionTip = false;
//axios.defaults.baseURL="https://localhost:44370"
//prod
axios.defaults.baseURL="https://apiexpediente.herokuapp.com"
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
