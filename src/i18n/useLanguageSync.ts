import { useEffect } from "react";
import { htmlLang } from "./languages";
import { useLanguageStore } from "./useLanguageStore";

// 저장된 언어를 불러오고, 언어가 바뀔 때마다 <html lang>을 맞춤
export default function useLanguageSync() {
	const language = useLanguageStore((state) => state.currentLanguage);
	useEffect(() => {
		useLanguageStore.persist.rehydrate();
	}, []);
	useEffect(() => {
		document.documentElement.lang = htmlLang(language);
	}, [language]);
}
