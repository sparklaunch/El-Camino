import { useMutation, useQueryClient } from "@tanstack/react-query";
import CartDish from "@/domain/cart/CartDish";
import cartAPI from "../api/cartAPI";
import { cartMutationScope, cartQueryKey } from "./useCart";

export default function useClearCart() {
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: cartAPI.clearCart,
		scope: cartMutationScope,
		// 서버 응답을 기다리지 않고 화면에서 카트를 먼저 비움
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: cartQueryKey });
			const previousCart = queryClient.getQueryData<CartDish[]>(cartQueryKey);
			queryClient.setQueryData<CartDish[]>(cartQueryKey, []);
			return { previousCart };
		},
		onError: (error, _variables, context) => {
			console.error(error);
			queryClient.setQueryData(cartQueryKey, context?.previousCart);
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey: cartQueryKey })
	});
	return (cart: CartDish[]) => mutate(cart.map((item) => item.id));
}
