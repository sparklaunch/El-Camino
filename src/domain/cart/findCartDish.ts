import CartDish from "./CartDish";

// 같은 요리는 새로 담지 않고 수량을 늘리기 위해 이미 담긴 항목을 찾음
export default function findCartDish(cart: CartDish[], dishId: string) {
	return cart.find((item) => item.dishId === dishId);
}
