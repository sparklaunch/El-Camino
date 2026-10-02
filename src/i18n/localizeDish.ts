import Dish from "@/domain/menu/Dish";
import Language from "./Language";

// 한국어 계열 언어에서만 한국어 이름을 쓰고, 영어·스페인어에서는 스페인어 원어명(subname)을 사용
const koreanNameLanguages = [Language.korean, Language.jammin, Language.teulttak];

export function localizeDishName(dish: Dish, language: Language) {
	return koreanNameLanguages.includes(language) ? dish.name : dish.subname;
}

// 번역된 설명이 없으면 한국어 설명을 사용
export function localizeDishDescription(dish: Dish, language: Language) {
	switch (language) {
		case Language.english:
			return dish.englishDescription ?? dish.description;
		case Language.español:
			return dish.spanishDescription ?? dish.description;
		case Language.jammin:
			return dish.jamminDescription ?? dish.description;
		case Language.teulttak:
			return dish.teulttakDescription ?? dish.description;
		default:
			return dish.description;
	}
}
