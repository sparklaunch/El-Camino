import Language from "../enums/Language";
import { useLanguageStore } from "../stores/useLanguageStore";
import Dish from "../types/Dish";
import translations, { korean } from "./translations";

export default function useTranslation() {
	const language = useLanguageStore((state) => state.currentLanguage);
	const t = translations[language] ?? korean;
	const dishName = (dish: Dish) =>
		language === Language.english ?
			(dish.englishName ?? dish.name)
		:	dish.name;
	return { t, dishName };
}
