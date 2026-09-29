"use client";

import { useQuery } from "@tanstack/react-query";
import cartAPI from "../api/cartAPI";
import styles from "./Invoice.module.css";

export default function Invoice() {
	const { data: cart = [] } = useQuery({
		queryKey: ["cart"],
		queryFn: cartAPI.fetchCart
	});
	const totalPrice = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	return (
		<aside className={styles.aside}>
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
									{(
										item.price * item.quantity
									).toLocaleString()}
									원
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
