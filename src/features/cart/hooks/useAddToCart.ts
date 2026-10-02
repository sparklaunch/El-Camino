import { useMutation, useQueryClient } from "@tanstack/react-query";
import CartDish from "@/domain/cart/CartDish";
import findCartDish from "@/domain/cart/findCartDish";
import Dish from "@/domain/menu/Dish";
import cartAPI from "../api/cartAPI";
import { cartMutationScope, cartQueryKey } from "./useCart";

export default function useAddToCart() {
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		scope: cartMutationScope,
		mutationFn: (dish: Dish) => {
			const cart = queryClient.getQueryData<CartDish[]>(cartQueryKey) ?? [];
			const cartDish = findCartDish(cart, dish.id);
			return cartDish ?
					cartAPI.updateQuantity({
						id: cartDish.id,
						quantity: cartDish.quantity + 1
					})
				:	cartAPI.addToCart(dish);
		},
		onError: (error) => console.error(error),
		onSettled: () => queryClient.invalidateQueries({ queryKey: cartQueryKey })
	});
	return mutate;
}
