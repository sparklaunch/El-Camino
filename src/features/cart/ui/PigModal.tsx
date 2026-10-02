"use client";

import useModal from "../hooks/useModal";
import useTranslation from "../i18n/useTranslation";
import styles from "./PigModal.module.css";

export default function PigModal({ onClose }: { onClose: () => void }) {
	const { t } = useTranslation();
	const { dialogRef, close, cancelHandler } = useModal(onClose);
	const clickHandler = (event: React.MouseEvent<HTMLDialogElement>) => {
		// 내용 영역 바깥(배경)을 클릭하면 dialog 자체가 target이 됨
		if (event.target === event.currentTarget) {
			close();
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
			<div className={styles.content}>
				<span className={styles.pig}>🐷</span>
				<p className={styles.message}>{t.overLimit}</p>
				<button
					type="button"
					className={styles.closeButton}
					onClick={close}
				>
					{t.close}
				</button>
			</div>
		</dialog>
	);
}
