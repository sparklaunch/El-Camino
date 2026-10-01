"use client";

import Language from "../enums/Language";
import { useLanguageStore } from "../stores/useLanguageStore";
import styles from "./LanguageSelector.module.css";

export default function LanguageSelector() {
	const { setLanguage } = useLanguageStore();
	return (
		<section className={styles.languageSelector}>
			<ul className={styles.languageList}>
				<li className={styles.languageListItem}>
					<button
						type="button"
						className={styles.languageButton}
						onClick={() => setLanguage(Language.korean)}
					>
						한국어
					</button>
				</li>
				<li className={styles.languageListItem}>
					<button
						type="button"
						className={styles.languageButton}
						onClick={() => setLanguage(Language.english)}
					>
						English
					</button>
				</li>
				<li className={styles.languageListItem}>
					<button
						type="button"
						className={styles.languageButton}
						onClick={() => setLanguage(Language.español)}
					>
						Español
					</button>
				</li>
				<li className={styles.languageListItem}>
					<button
						type="button"
						className={styles.languageButton}
						onClick={() => setLanguage(Language.jammin)}
					>
						잼민이
					</button>
				</li>
				<li className={styles.languageListItem}>
					<button
						type="button"
						className={styles.languageButton}
						onClick={() => setLanguage(Language.teulttak)}
					>
						어르신
					</button>
				</li>
			</ul>
		</section>
	);
}
