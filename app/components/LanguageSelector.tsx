import styles from "./LanguageSelector.module.css";

export default function LanguageSelector() {
	return (
		<section className={styles.languageSelector}>
			<ul className={styles.languageList}>
				<li className={styles.languageListItem}>
					<button type="button" className={styles.languageButton}>
						한국어
					</button>
				</li>
				<li className={styles.languageListItem}>
					<button type="button" className={styles.languageButton}>
						English
					</button>
				</li>
				<li className={styles.languageListItem}>
					<button type="button" className={styles.languageButton}>
						Español
					</button>
				</li>
			</ul>
		</section>
	);
}
