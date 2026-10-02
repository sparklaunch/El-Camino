"use client";

import { clsx } from "clsx";
import { useState } from "react";
import { COUPON_LENGTH, isValidCoupon } from "../helpers/coupon";
import useModal from "../hooks/useModal";
import useTranslation from "../i18n/useTranslation";
import styles from "./CouponModal.module.css";

// 입력값에서 알파벳·숫자만 남기고 대문자로 바꿔 16자리까지 자름
const normalize = (value: string) =>
	value
		.replace(/[^a-zA-Z0-9]/g, "")
		.toUpperCase()
		.slice(0, COUPON_LENGTH);

// 읽기 쉽도록 4자리마다 하이픈을 넣어 표시 (XXXX-XXXX-XXXX-XXXX)
const format = (code: string) => code.match(/.{1,4}/g)?.join("-") ?? "";

export default function CouponModal({
	onClose,
	onSubmit
}: {
	onClose: () => void;
	onSubmit: (code: string) => void;
}) {
	const { t } = useTranslation();
	const { dialogRef, close, cancelHandler } = useModal(onClose);
	const [code, setCode] = useState("");
	const [isInvalid, setIsInvalid] = useState(false);
	const clickHandler = (event: React.MouseEvent<HTMLDialogElement>) => {
		// 내용 영역 바깥(배경)을 클릭하면 dialog 자체가 target이 됨
		if (event.target === event.currentTarget) {
			close();
		}
	};
	const isComplete = code.length === COUPON_LENGTH;
	const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!isComplete) {
			return;
		}
		if (isValidCoupon(code)) {
			onSubmit(code);
			close();
		} else {
			setIsInvalid(true);
		}
	};
	return (
		<dialog
			ref={dialogRef}
			className={styles.dialog}
			onClick={clickHandler}
			onCancel={cancelHandler}
			onClose={onClose}
		>
			<form className={styles.content} onSubmit={submitHandler}>
				<h2 className={styles.title}>{t.couponTitle}</h2>
				<p className={styles.hint}>{t.couponHint}</p>
				<input
					type="text"
					className={clsx(styles.input, { [styles.invalid]: isInvalid })}
					value={format(code)}
					onChange={(event) => {
						setCode(normalize(event.target.value));
						setIsInvalid(false);
					}}
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
