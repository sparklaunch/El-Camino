import Language from "./Language";

// 언어 선택 화면에 표시되는 순서. htmlLang은 <html lang>에 넣을 값
export const languages = [
	{ value: Language.korean, label: "한국어", htmlLang: "ko" },
	{ value: Language.english, label: "English", htmlLang: "en" },
	{ value: Language.español, label: "Español", htmlLang: "es" },
	{ value: Language.jammin, label: "잼민이", htmlLang: "ko" },
	{ value: Language.teulttak, label: "어르신", htmlLang: "ko" }
];

export function htmlLang(language: Language) {
	return languages.find(({ value }) => value === language)?.htmlLang ?? "ko";
}
