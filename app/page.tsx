import LanguageSelector from "./components/LanguageSelector";
import styles from "./Home.module.css";

export default function Home() {
	return (
		<main className={styles.main}>
			<LanguageSelector />
			<section className={styles.welcomeScreen}></section>
		</main>
	);
}
