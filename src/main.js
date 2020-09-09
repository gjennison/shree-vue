import Vue from "vue";
import App from "./App.vue";

require("dotenv").config();

import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: { key: "AIzaSyA-wGOihp0pxX1sMQjC2fGdfyCiszIyG0g" },
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
