import { useQuery } from "@tanstack/react-query";
import Diet from "@/domain/menu/Diet";
import matchesDiet from "@/domain/menu/matchesDiet";
import dishAPI from "../api/dishAPI";

// 전체 메뉴는 한 번만 불러오고, 채식 필터는 캐시된 데이터에서 걸러냄
export default function useDishes(dietFilter?: Diet) {
	return useQuery({
		queryKey: ["dishes"],
		queryFn: () => dishAPI.fetchDishes(),
		select: (dishes) => dishes.filter((dish) => matchesDiet(dish, dietFilter))
	});
}
