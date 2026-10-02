"use client";

import { languages } from "@/i18n/languages";
import { useLanguageStore } from "@/i18n/useLanguageStore";
import styles from "./LanguageSelector.module.css";

export default function LanguageSelector() {
	const setLanguage = useLanguageStore((state) => state.setLanguage);
	return (
		<section className={styles.languageSelector}>
			<ul className={styles.languageList}>
				{languages.map(({ value, label }) => (
					<li key={value} className={styles.languageListItem}>
						<button
							type="button"
							className={styles.languageButton}
							onClick={() => setLanguage(value)}
						>
							{label}
						</button>
					</li>
				))}
			</ul>
		</section>
	);
}
