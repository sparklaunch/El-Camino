import LanguageSelector from "./components/LanguageSelector";
import WelcomeScreen from "./components/WelcomeScreen";
import PageTransition from "./components/PageTransition";
import styles from "./Home.module.css";

export default function Home() {
	return (
		<PageTransition>
			<main className={styles.main}>
				<LanguageSelector />
				<WelcomeScreen />
			</main>
		</PageTransition>
	);
}
