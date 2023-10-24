import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@vueuse/head";
import App from "./App.vue";
import router from "./router";
import i18n from "./languages";
import { createFormily } from '@vue-formily/formily';
import stringFormat from '@vue-formily/string-format';

const formily = createFormily();
formily.plug(stringFormat);

const app = createApp(App);
const pinia = createPinia();
const head = createHead();

app.use(formily);
app.use(router);
app.use(pinia);
app.use(head);
app.use(i18n);

app.mount("#app");
