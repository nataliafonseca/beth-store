import { createApp, markRaw } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { createPinia } from "pinia";
import VueTheMask from "vue-the-mask";

const app = createApp(App);

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(pinia);
app.use(VueTheMask);
app.use(router);
app.mount("#app");
