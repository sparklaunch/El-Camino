"use client";

import { useEffect, useRef } from "react";
import useTranslation from "../i18n/useTranslation";
import styles from "./PigModal.module.css";

export default function PigModal({ onClose }: { onClose: () => void }) {
	const { t } = useTranslation();
	const dialogRef = useRef<HTMLDialogElement>(null);
	useEffect(() => {
		dialogRef.current?.showModal();
	}, []);
	const clickHandler = (event: React.MouseEvent<HTMLDialogElement>) => {
		// 내용 영역 바깥(배경)을 클릭하면 dialog 자체가 target이 됨
		if (event.target === event.currentTarget) {
			onClose();
		}
	};
	return (
		<dialog
			ref={dialogRef}
			className={styles.dialog}
			onClick={clickHandler}
			onClose={onClose}
		>
			<div className={styles.content}>
				<span className={styles.pig}>🐷</span>
				<p className={styles.message}>{t.overLimit}</p>
				<button
					type="button"
					className={styles.closeButton}
					onClick={onClose}
				>
					{t.close}
				</button>
			</div>
		</dialog>
	);
}
