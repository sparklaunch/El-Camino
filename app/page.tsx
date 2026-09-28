import LanguageSelector from "./components/LanguageSelector";
import WelcomeScreen from "./components/WelcomeScreen";
import styles from "./Home.module.css";

export default function Home() {
	return (
		<main className={styles.main}>
			<LanguageSelector />
			<WelcomeScreen />
		</main>
	);
}
