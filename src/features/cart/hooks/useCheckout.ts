import { useRouter } from "next/navigation";
import { useState } from "react";
import { summarizeCart } from "@/domain/cart/pricing";
import { COUPON_DISCOUNT_RATE } from "@/domain/coupon/coupon";
import useCart from "./useCart";
import useClearCart from "./useClearCart";

// 주문서에 필요한 카트 내용, 할인 적용 금액, 초기화·결제 동작을 모아 둠
export default function useCheckout() {
	const cart = useCart();
	const clearCart = useClearCart();
	const router = useRouter();
	const [isCouponApplied, setIsCouponApplied] = useState(false);
	const discountRate = isCouponApplied ? COUPON_DISCOUNT_RATE : 0;
	const summary = summarizeCart(cart, discountRate);
	const reset = () => {
		clearCart(cart);
		setIsCouponApplied(false);
	};
	// 결제가 끝나면 카트를 비우고 완료 페이지로 이동
	const pay = () => {
		reset();
		router.push("/complete");
	};
	return {
		cart,
		...summary,
		discountRate,
		isCouponApplied,
		applyCoupon: () => setIsCouponApplied(true),
		reset,
		pay
	};
}
