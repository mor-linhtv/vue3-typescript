import { createI18n } from "vue-i18n";
import enLang from "./en";
import vnLang from "./vn";

const i18n =  createI18n({
  locale: import.meta.env.VITE_APP_I18N_LOCALE || "vi",
  fallbackLocale: import.meta.env.VITE_APP_I18N_LOCALE || "vi",
  legacy: false,
  globalInjection: true,
  messages: {
    en: enLang,
    vi: vnLang,
  },
});
export default i18n;
