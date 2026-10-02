import Diet from "./Diet";
import Dish from "./Dish";

// 비건 요리는 채식 조건도 만족하므로 채식 필터에 함께 포함
const allowedDiets: Record<Diet, Diet[]> = {
	[Diet.vegan]: [Diet.vegan],
	[Diet.vegetarian]: [Diet.vegan, Diet.vegetarian]
};

export default function matchesDiet(dish: Dish, filter?: Diet) {
	if (!filter) {
		return true;
	}
	return dish.diet !== undefined && allowedDiets[filter].includes(dish.diet);
}
