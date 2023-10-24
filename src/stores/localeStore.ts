import { defineStore } from "pinia";
const browserLang = navigator.language.split("-")[0];

export const useLocaleStore = defineStore({
  id: "locale",
  state: () => ({
    locale:localStorage.getItem("locale") || browserLang as string
  }),
  actions: {
    updateLocaleStore(locale: string) {
        this.locale = locale
      },
  },
});
