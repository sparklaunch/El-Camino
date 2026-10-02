"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import cartAPI from "../api/cartAPI";
import useAddToCart, { DISH_DRAG_TYPE } from "../hooks/useAddToCart";
import useTranslation from "../i18n/useTranslation";
import CartDish from "../types/CartDish";
import Dish from "../types/Dish";
import CouponModal from "./CouponModal";
import styles from "./Invoice.module.css";
import PigModal from "./PigModal";
import SplitFlap from "./SplitFlap";

// 합계가 이 금액을 넘으면 이스터 에그 모달을 띄움
const PIG_LIMIT = 100_000;
// 올바른 쿠폰을 적용하면 모든 음식에 적용되는 할인율
const COUPON_DISCOUNT_RATE = 0.5;

export default function Invoice() {
	const { t, dishName } = useTranslation();
	const { data: cart = [] } = useQuery({
		queryKey: ["cart"],
		queryFn: cartAPI.fetchCart
	});
	const [isCouponApplied, setIsCouponApplied] = useState(false);
	// 쿠폰이 적용되어 있으면 각 음식의 가격을 할인해서 계산 (원 단위 미만은 버림)
	const linePrice = (item: CartDish) =>
		isCouponApplied ?
			Math.floor(item.price * item.quantity * (1 - COUPON_DISCOUNT_RATE))
		:	item.price * item.quantity;
	const originalPrice = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	const totalPrice = cart.reduce((sum, item) => sum + linePrice(item), 0);
	const isOverLimit = totalPrice > PIG_LIMIT;
	const [wasOverLimit, setWasOverLimit] = useState(isOverLimit);
	const [showPigModal, setShowPigModal] = useState(false);
	const [showCouponModal, setShowCouponModal] = useState(false);
	// 합계가 기준 금액을 새로 넘어서는 순간에만 모달을 띄움
	if (isOverLimit !== wasOverLimit) {
		setWasOverLimit(isOverLimit);
		setShowPigModal(isOverLimit);
	}
	const queryClient = useQueryClient();
	const { mutate: clearMutate } = useMutation({
		mutationFn: cartAPI.clearCart,
		// 담기·수량 변경 요청과 섞이지 않도록 순서대로 처리
		scope: { id: "cart" },
		// 서버 응답을 기다리지 않고 화면에서 카트를 먼저 비움
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ["cart"] });
			const previousCart = queryClient.getQueryData<CartDish[]>(["cart"]);
			queryClient.setQueryData<CartDish[]>(["cart"], []);
			return { previousCart };
		},
		onError: (error, _variables, context) => {
			console.error(error);
			queryClient.setQueryData(["cart"], context?.previousCart);
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey: ["cart"] })
	});
	const reset = () => {
		clearMutate(cart.map((item) => item.id));
		setIsCouponApplied(false);
	};
	const router = useRouter();
	// 결제가 끝나면 카트를 비우고 완료 페이지로 이동
	const pay = () => {
		reset();
		router.push("/complete");
	};
	const addToCart = useAddToCart();
	const [isDragOver, setIsDragOver] = useState(false);
	// DishCard를 끌고 있을 때만 드롭을 허용함
	const dragOverHandler = (event: React.DragEvent<HTMLElement>) => {
		if (!event.dataTransfer.types.includes(DISH_DRAG_TYPE)) {
			return;
		}
		event.preventDefault();
		event.dataTransfer.dropEffect = "copy";
		setIsDragOver(true);
	};
	const dragLeaveHandler = (event: React.DragEvent<HTMLElement>) => {
		// 주문서 안의 자식 요소로 이동할 때는 강조를 유지함
		if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
			return;
		}
		setIsDragOver(false);
	};
	const dropHandler = (event: React.DragEvent<HTMLElement>) => {
		event.preventDefault();
		setIsDragOver(false);
		const data = event.dataTransfer.getData(DISH_DRAG_TYPE);
		if (data) {
			addToCart(JSON.parse(data) as Dish);
		}
	};
	return (
		<aside className={styles.aside}>
			<section
				className={clsx(styles.invoice, {
					[styles.dragOver]: isDragOver
				})}
				onDragOver={dragOverHandler}
				onDragLeave={dragLeaveHandler}
				onDrop={dropHandler}
			>
				<h2 className={styles.invoiceTitle}>{t.invoiceTitle}</h2>
				{cart.length > 0 ?
					<ul className={styles.itemList}>
						{cart.map((item) => (
							<li key={item.id} className={styles.item}>
								<span className={styles.itemName}>
									{dishName(item)} × {item.quantity}
								</span>
								<span className={styles.itemPrice}>
									{isCouponApplied && (
										<s className={styles.originalPrice}>
											<SplitFlap
												text={t.price(item.price * item.quantity)}
											/>
										</s>
									)}
									<SplitFlap text={t.price(linePrice(item))} />
								</span>
							</li>
						))}
					</ul>
				:	<p className={styles.empty}>{t.emptyCart}</p>}
				<hr className={styles.divider} />
				{isCouponApplied && (
					<div className={styles.discount}>
						<span>{t.couponApplied}</span>
						<SplitFlap
							text={`-${t.price(originalPrice - totalPrice)}`}
						/>
					</div>
				)}
				<div className={styles.total}>
					<span>{t.total}</span>
					<SplitFlap text={t.price(totalPrice)} />
				</div>
				<button
					type="button"
					className={styles.couponButton}
					onClick={() => setShowCouponModal(true)}
					disabled={isCouponApplied}
				>
					{t.useCoupon}
				</button>
				<div className={styles.buttons}>
					<button
						type="button"
						className={styles.resetButton}
						onClick={reset}
					>
						{t.reset}
					</button>
					<button
						type="button"
						className={styles.payButton}
						onClick={pay}
						disabled={cart.length === 0}
					>
						{t.pay}
					</button>
				</div>
			</section>
			{showCouponModal && (
				<CouponModal
					onClose={() => setShowCouponModal(false)}
					onSubmit={() => setIsCouponApplied(true)}
				/>
			)}
			{showPigModal && (
				<PigModal onClose={() => setShowPigModal(false)} />
			)}
		</aside>
	);
}
