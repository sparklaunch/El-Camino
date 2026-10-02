"use client";

import useTranslation from "@/i18n/useTranslation";
import useModal from "@/shared/hooks/useModal";
import styles from "./PigModal.module.css";

export default function PigModal({ onClose }: { onClose: () => void }) {
	const { t } = useTranslation();
	const { dialogRef, close, cancelHandler, backdropClickHandler } = useModal(onClose);
	return (
		<dialog
			ref={dialogRef}
			className={styles.dialog}
			onClick={backdropClickHandler}
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
