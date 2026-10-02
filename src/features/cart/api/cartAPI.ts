import CartDish from "@/domain/cart/CartDish";
import Dish from "@/domain/menu/Dish";
import http from "@/shared/api/http";

const cartAPI = {
	fetchCart: async () => {
		const cart = await http.get<CartDish[]>("/cart", "카트를 불러오는 데에 실패했어.");
		// quantity 필드가 생기기 전에 담긴 아이템은 1개로 취급
		return cart.map((item) => ({ ...item, quantity: item.quantity ?? 1 }));
	},
	addToCart: (dish: Dish) =>
		http.post(
			"/cart",
			{ ...dish, dishId: dish.id, quantity: 1 },
			"카트에 아이템을 추가하는 데에 실패했어."
		),
	updateQuantity: ({ id, quantity }: { id: string; quantity: number }) =>
		http.patch(`/cart/${id}`, { quantity }, "수량을 변경하는 데에 실패했어."),
	deleteFromCart: (id: string) => http.delete(`/cart/${id}`, "삭제하는 데에 실패했어."),
	// json-server는 일괄 삭제를 지원하지 않아서 항목마다 DELETE 요청을 보냄
	clearCart: async (ids: string[]) => {
		await Promise.all(ids.map((id) => cartAPI.deleteFromCart(id)));
	}
};

export default cartAPI;
