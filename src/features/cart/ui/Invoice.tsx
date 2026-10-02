"use client";

import { clsx } from "clsx";
import { useState } from "react";
import { linePrice } from "@/domain/cart/pricing";
import { CouponModal } from "@/features/coupon";
import useTranslation from "@/i18n/useTranslation";
import SplitFlap from "@/shared/ui/SplitFlap";
import useAddToCart from "../hooks/useAddToCart";
import useCheckout from "../hooks/useCheckout";
import useDishDrop from "../hooks/useDishDrop";
import useOverLimitAlert from "../hooks/useOverLimitAlert";
import styles from "./Invoice.module.css";
import PigModal from "./PigModal";

export default function Invoice() {
	const { t, dishName } = useTranslation();
	const {
		cart,
		totalPrice,
		discountAmount,
		discountRate,
		isOverLimit,
		isCouponApplied,
		applyCoupon,
		reset,
		pay
	} = useCheckout();
	const { isAlertOpen, closeAlert } = useOverLimitAlert(isOverLimit);
	const [showCouponModal, setShowCouponModal] = useState(false);
	const addToCart = useAddToCart();
	const { isDragOver, dropZoneProps } = useDishDrop(addToCart);
	return (
		<aside className={styles.aside}>
			<section
				className={clsx(styles.invoice, {
					[styles.dragOver]: isDragOver
				})}
				{...dropZoneProps}
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
											<SplitFlap text={t.price(linePrice(item))} />
										</s>
									)}
									<SplitFlap
										text={t.price(linePrice(item, discountRate))}
									/>
								</span>
							</li>
						))}
					</ul>
				:	<p className={styles.empty}>{t.emptyCart}</p>}
				<hr className={styles.divider} />
				{isCouponApplied && (
					<div className={styles.discount}>
						<span>{t.couponApplied}</span>
						<SplitFlap text={`-${t.price(discountAmount)}`} />
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
					onSubmit={applyCoupon}
				/>
			)}
			{isAlertOpen && <PigModal onClose={closeAlert} />}
		</aside>
	);
}
