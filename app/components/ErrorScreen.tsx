"use client";

import Image from "next/image";
import logo from "../assets/images/logo.png";
import useTranslation from "../i18n/useTranslation";
import styles from "./ErrorScreen.module.css";

type Props = {
	message?: string;
	onRetry?: () => void;
	isRetrying?: boolean;
};

export default function ErrorScreen({ message, onRetry, isRetrying = false }: Props) {
	const { t } = useTranslation();
	return (
		<section className={styles.errorScreen} role="alert">
			<Image src={logo} alt="El Camino Logo" className={styles.logo} priority />
			<div className={styles.icon} aria-hidden="true">
				!
			</div>
			<p className={styles.text}>{t.error}</p>
			{message && <p className={styles.message}>{message}</p>}
			{onRetry && (
				<button
					type="button"
					className={styles.retryButton}
					onClick={onRetry}
					disabled={isRetrying}
				>
					{isRetrying ? t.loading : t.retry}
				</button>
			)}
		</section>
	);
}
