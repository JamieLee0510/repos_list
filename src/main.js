import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Card, Container, Header, Main, Footer } from "element-ui";

Vue.config.productionTip = false;

Vue.use(Card);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
