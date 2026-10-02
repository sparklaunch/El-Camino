import Image from "next/image";
import logo from "../assets/logo.png";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen({ label }: { label: string }) {
	return (
		<section className={styles.loadingScreen} role="status" aria-live="polite">
			<Image src={logo} alt="El Camino Logo" className={styles.logo} priority />
			<div className={styles.dots} aria-hidden="true">
				<span className={styles.dot} />
				<span className={styles.dot} />
				<span className={styles.dot} />
			</div>
			<p className={styles.text}>{label}</p>
		</section>
	);
}
