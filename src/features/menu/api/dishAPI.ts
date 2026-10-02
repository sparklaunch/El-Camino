import Category from "@/domain/menu/Category";
import Dish from "@/domain/menu/Dish";
import http from "@/shared/api/http";

const dishAPI = {
	fetchDishes: (category?: Category) => {
		const params = new URLSearchParams();
		if (category) {
			params.set("category", category);
		}
		return http.get<Dish[]>(`/dishes?${params}`, "요리를 불러오는 데에 실패했어.");
	}
};

export default dishAPI;
