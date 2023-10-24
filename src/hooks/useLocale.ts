import { useLocaleStore } from "@/stores/localeStore";
import { ref } from "vue";

	
export function useLocale() {
	const localeAvailable = ["vi", "en"];
	const defaultLang = import.meta.env.VITE_APP_I18N_LOCALE || "vi";
	const localeStore = useLocaleStore();
	let browserLang = navigator.language.split("-")[0];
	browserLang = localeAvailable.includes(browserLang) ? browserLang : defaultLang;
	const userLang = localStorage.getItem("locale") ?? browserLang;
	const currentLocale = ref(userLang);

	const setLocale = (lang: string) => {
		currentLocale.value = lang;
		localStorage.setItem("locale", lang);
		localeStore.updateLocaleStore(lang)
	}

	return { currentLocale, setLocale };
}