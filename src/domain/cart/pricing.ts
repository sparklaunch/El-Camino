import CartDish from "./CartDish";

// 합계가 이 금액을 넘으면 너무 많이 주문했다고 알려 줌
export const OVER_LIMIT_PRICE = 100_000;

// 할인이 있으면 각 음식의 가격을 할인해서 계산 (원 단위 미만은 버림)
export function linePrice(item: CartDish, discountRate = 0) {
	return Math.floor(item.price * item.quantity * (1 - discountRate));
}

export function summarizeCart(cart: CartDish[], discountRate = 0) {
	const originalPrice = cart.reduce((sum, item) => sum + linePrice(item), 0);
	const totalPrice = cart.reduce(
		(sum, item) => sum + linePrice(item, discountRate),
		0
	);
	return {
		originalPrice,
		totalPrice,
		discountAmount: originalPrice - totalPrice,
		isOverLimit: totalPrice > OVER_LIMIT_PRICE
	};
}
