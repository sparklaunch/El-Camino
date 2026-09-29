"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import cartAPI from "../api/cartAPI";
import styles from "./Invoice.module.css";

export default function Invoice() {
	const router = useRouter();
	const { data: cart = [] } = useQuery({
		queryKey: ["cart"],
		queryFn: cartAPI.fetchCart
	});
	const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
	const totalPrice = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	const cartClickHandler = () => {
		router.push("/main/cart");
	};
	return (
		<aside className={styles.aside}>
			<div className={styles.cartWrapper}>
				<button
					type="button"
					className={styles.cart}
					onClick={cartClickHandler}
				>
					🛒
				</button>
				{cartCount > 0 ?
					<div className={styles.cartBadgeWrapper}>
						<p className={styles.cartBadge}>{cartCount}</p>
					</div>
				:	<></>}
			</div>
			<section className={styles.invoice}>
				<h2 className={styles.invoiceTitle}>주문 내역</h2>
				{cart.length > 0 ?
					<ul className={styles.itemList}>
						{cart.map((item) => (
							<li key={item.id} className={styles.item}>
								<span className={styles.itemName}>
									{item.name} × {item.quantity}
								</span>
								<span className={styles.itemPrice}>
									{(item.price * item.quantity).toLocaleString()}원
								</span>
							</li>
						))}
					</ul>
				:	<p className={styles.empty}>담은 메뉴가 없어.</p>}
				<hr className={styles.divider} />
				<div className={styles.total}>
					<span>합계</span>
					<span>{totalPrice.toLocaleString()}원</span>
				</div>
			</section>
		</aside>
	);
}
