import Image from "next/image";
import logo from "../assets/images/logo.png";
import styles from "./WelcomeScreen.module.css";

export default function WelcomeScreen() {
	return (
		<section className={styles.welcomeScreen}>
			<Image src={logo} alt="El Camino Logo" className={styles.logo} />
			<h1 className={styles.header}>화면을 터치해 주문하세요</h1>
		</section>
	);
}
