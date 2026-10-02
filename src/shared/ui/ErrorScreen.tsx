import Image from "next/image";
import logo from "../assets/logo.png";
import styles from "./ErrorScreen.module.css";

type Props = {
	title: string;
	message?: string;
	retryLabel: string;
	retryingLabel: string;
	onRetry?: () => void;
	isRetrying?: boolean;
};

export default function ErrorScreen({
	title,
	message,
	retryLabel,
	retryingLabel,
	onRetry,
	isRetrying = false
}: Props) {
	return (
		<section className={styles.errorScreen} role="alert">
			<Image src={logo} alt="El Camino Logo" className={styles.logo} priority />
			<div className={styles.icon} aria-hidden="true">
				!
			</div>
			<p className={styles.text}>{title}</p>
			{message && <p className={styles.message}>{message}</p>}
			{onRetry && (
				<button
					type="button"
					className={styles.retryButton}
					onClick={onRetry}
					disabled={isRetrying}
				>
					{isRetrying ? retryingLabel : retryLabel}
				</button>
			)}
		</section>
	);
}
