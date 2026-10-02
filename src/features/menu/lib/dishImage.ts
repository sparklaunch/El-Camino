import Dish from "@/domain/menu/Dish";
import removeDiacritics from "@/shared/lib/removeDiacritics";

// 이미지 파일 이름은 스페인어 원어명을 소문자·하이픈으로 바꾼 것 (예: Pan con Tomate → pan-con-tomate.jpg)
export default function dishImageSrc(dish: Dish) {
	const fileName = removeDiacritics(dish.subname).toLowerCase().replaceAll(" ", "-");
	return `/assets/images/${fileName}.jpg`;
}
