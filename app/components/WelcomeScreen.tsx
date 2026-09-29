"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../assets/images/logo.png";
import Option from "../enums/Option";
import useTranslation from "../i18n/useTranslation";
import { useOptionStore } from "../stores/useOptionStore";
import styles from "./WelcomeScreen.module.css";

export default function WelcomeScreen() {
	const { setOption } = useOptionStore();
	const router = useRouter();
	const { t } = useTranslation();
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const { option } = event.currentTarget.dataset;
		switch (option) {
			case "forHere":
				setOption(Option.forHere);
				router.push("/main");
				break;
			case "toGo":
				setOption(Option.toGo);
				router.push("/main");
				break;
		}
	};
	return (
		<section className={styles.welcomeScreen}>
			<Image src={logo} alt="El Camino Logo" className={styles.logo} />
			<h1 className={styles.header}>{t.welcome}</h1>
			<div className={styles.options}>
				<button
					type="button"
					className={styles.option}
					onClick={handleClick}
					data-option="forHere"
				>
					{t.forHere}
				</button>
				<button
					type="button"
					className={styles.option}
					onClick={handleClick}
					data-option="toGo"
				>
					{t.toGo}
				</button>
			</div>
		</section>
	);
}
