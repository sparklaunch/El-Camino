"use client";

import { clsx } from "clsx";
import React from "react";
import { COUPON_LENGTH } from "@/domain/coupon/coupon";
import useTranslation from "@/i18n/useTranslation";
import useModal from "@/shared/hooks/useModal";
import useCouponInput from "../hooks/useCouponInput";
import styles from "./CouponModal.module.css";

export default function CouponModal({
	onClose,
	onSubmit
}: {
	onClose: () => void;
	onSubmit: (code: string) => void;
}) {
	const { t } = useTranslation();
	const { dialogRef, close, cancelHandler, backdropClickHandler } = useModal(onClose);
	const { code, formattedCode, isInvalid, isComplete, change, validate } =
		useCouponInput();
	const submitHandler = (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (validate()) {
			onSubmit(code);
			close();
		}
	};
	return (
		<dialog
			ref={dialogRef}
			className={styles.dialog}
			onClick={backdropClickHandler}
			onCancel={cancelHandler}
			onClose={onClose}
		>
			<form className={styles.content} onSubmit={submitHandler}>
				<h2 className={styles.title}>{t.couponTitle}</h2>
				<p className={styles.hint}>{t.couponHint}</p>
				<input
					type="text"
					className={clsx(styles.input, {
						[styles.invalid]: isInvalid
					})}
					value={formattedCode}
					onChange={(event) => change(event.target.value)}
					aria-invalid={isInvalid}
					placeholder="XXXX-XXXX-XXXX-XXXX"
					autoComplete="off"
					autoCapitalize="characters"
					spellCheck={false}
					autoFocus
				/>
				<div className={styles.status}>
					{isInvalid && (
						<p className={styles.error} role="alert">
							⚠️ {t.invalidCoupon}
						</p>
					)}
					<p className={styles.counter}>
						{code.length} / {COUPON_LENGTH}
					</p>
				</div>
				<div className={styles.buttons}>
					<button
						type="button"
						className={styles.button}
						onClick={close}
					>
						{t.close}
					</button>
					<button
						type="submit"
						className={styles.button}
						disabled={!isComplete}
					>
						{t.apply}
					</button>
				</div>
			</form>
		</dialog>
	);
}
