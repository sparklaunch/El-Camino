import Dish from "@/domain/menu/Dish";
import { localizeDishDescription, localizeDishName } from "./localizeDish";
import translations, { korean } from "./translations";
import { useLanguageStore } from "./useLanguageStore";

export default function useTranslation() {
	const language = useLanguageStore((state) => state.currentLanguage);
	const t = translations[language] ?? korean;
	const dishName = (dish: Dish) => localizeDishName(dish, language);
	const dishDescription = (dish: Dish) =>
		localizeDishDescription(dish, language);
	return { t, dishName, dishDescription };
}
