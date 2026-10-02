import { LanguageSelector } from "@/features/language";
import { WelcomeScreen } from "@/features/order";
import PageTransition from "@/shared/ui/PageTransition";
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
