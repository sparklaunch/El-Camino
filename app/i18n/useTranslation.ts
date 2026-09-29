import Language from "../enums/Language";
import { useLanguageStore } from "../stores/useLanguageStore";
import Dish from "../types/Dish";
import translations, { korean } from "./translations";

export default function useTranslation() {
	const language = useLanguageStore((state) => state.currentLanguage);
	const t = translations[language] ?? korean;
	// 영어·스페인어에서는 스페인어 원어명(subname)을 요리 이름으로 사용
	const dishName = (dish: Dish) =>
		language === Language.korean ? dish.name : dish.subname;
	const dishDescription = (dish: Dish) =>
		language === Language.english ?
			(dish.englishDescription ?? dish.description)
		:	dish.description;
	return { t, dishName, dishDescription };
}
