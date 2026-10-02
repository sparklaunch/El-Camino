import { useMutation, useQueryClient } from "@tanstack/react-query";
import cartAPI from "../api/cartAPI";
import CartDish from "../types/CartDish";
import Dish from "../types/Dish";

// 드래그 중인 요리 데이터를 담는 dataTransfer 타입
export const DISH_DRAG_TYPE = "application/x-el-camino-dish";

export default function useAddToCart() {
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		scope: { id: "cart" },
		mutationFn: (dish: Dish) => {
			const cart = queryClient.getQueryData<CartDish[]>(["cart"]) ?? [];
			const cartDish = cart.find((item) => item.dishId === dish.id);
			return cartDish ?
					cartAPI.updateQuantity({
						id: cartDish.id,
						quantity: cartDish.quantity + 1
					})
				:	cartAPI.addToCart(dish);
		},
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: ["cart"]
			})
	});
	return mutate;
}
