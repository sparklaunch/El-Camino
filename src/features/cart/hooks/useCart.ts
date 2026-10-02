import { useQuery } from "@tanstack/react-query";
import cartAPI from "../api/cartAPI";

export const cartQueryKey = ["cart"];

// 담기·수량 변경·비우기 요청이 섞이지 않도록 같은 scope로 순서대로 처리
export const cartMutationScope = { id: "cart" };

export default function useCart() {
	const { data: cart = [] } = useQuery({
		queryKey: cartQueryKey,
		queryFn: cartAPI.fetchCart
	});
	return cart;
}
