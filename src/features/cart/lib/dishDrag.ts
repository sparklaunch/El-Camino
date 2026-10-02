import Dish from "@/domain/menu/Dish";

// 드래그 중인 요리 데이터를 담는 dataTransfer 타입
const DISH_DRAG_TYPE = "application/x-el-camino-dish";

export function setDishDragData(dataTransfer: DataTransfer, dish: Dish) {
	dataTransfer.setData(DISH_DRAG_TYPE, JSON.stringify(dish));
	dataTransfer.effectAllowed = "copy";
}

export function hasDishDragData(dataTransfer: DataTransfer) {
	return dataTransfer.types.includes(DISH_DRAG_TYPE);
}

export function getDishDragData(dataTransfer: DataTransfer): Dish | undefined {
	const data = dataTransfer.getData(DISH_DRAG_TYPE);
	return data ? (JSON.parse(data) as Dish) : undefined;
}
