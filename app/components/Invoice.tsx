"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import cartAPI from "../api/cartAPI";
import useTranslation from "../i18n/useTranslation";
import CartDish from "../types/CartDish";
import styles from "./Invoice.module.css";

export default function Invoice() {
	const { t, dishName } = useTranslation();
	const { data: cart = [] } = useQuery({
		queryKey: ["cart"],
		queryFn: cartAPI.fetchCart
	});
	const totalPrice = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
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
	const reset = () => clearMutate(cart.map((item) => item.id));
	const router = useRouter();
	// 결제가 끝나면 카트를 비우고 완료 페이지로 이동
	const pay = () => {
		reset();
		router.push("/complete");
	};
	return (
		<aside className={styles.aside}>
			<section className={styles.invoice}>
				<h2 className={styles.invoiceTitle}>{t.invoiceTitle}</h2>
				{cart.length > 0 ?
					<ul className={styles.itemList}>
						{cart.map((item) => (
							<li key={item.id} className={styles.item}>
								<span className={styles.itemName}>
									{dishName(item)} × {item.quantity}
								</span>
								<span className={styles.itemPrice}>
									{t.price(item.price * item.quantity)}
								</span>
							</li>
						))}
					</ul>
				:	<p className={styles.empty}>{t.emptyCart}</p>}
				<hr className={styles.divider} />
				<div className={styles.total}>
					<span>{t.total}</span>
					<span>{t.price(totalPrice)}</span>
				</div>
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
		</aside>
	);
}
