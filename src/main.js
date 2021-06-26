import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import { message } from "ant-design-vue";
import { Carousel,CarouselItem } from "element-ui";
import "ant-design-vue/dist/antd.css";

Vue.use(Antd).use(Carousel).use(CarouselItem);

// .use()

Vue.prototype.$Message = message;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
