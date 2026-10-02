"use client";

import Image from "next/image";
import Option from "@/domain/order/Option";
import useTranslation from "@/i18n/useTranslation";
import logo from "@/shared/assets/logo.png";
import useStartOrder from "../hooks/useStartOrder";
import styles from "./WelcomeScreen.module.css";

export default function WelcomeScreen() {
	const startOrder = useStartOrder();
	const { t } = useTranslation();
	return (
		<section className={styles.welcomeScreen}>
			<Image src={logo} alt="El Camino Logo" className={styles.logo} />
			<h1 className={styles.header}>{t.welcome}</h1>
			<div className={styles.options}>
				<button
					type="button"
					className={styles.option}
					onClick={() => startOrder(Option.forHere)}
				>
					{t.forHere}
				</button>
				<button
					type="button"
					className={styles.option}
					onClick={() => startOrder(Option.toGo)}
				>
					{t.toGo}
				</button>
			</div>
		</section>
	);
}
