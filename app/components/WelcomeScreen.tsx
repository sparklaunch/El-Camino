"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../assets/images/logo.png";
import Option from "../enums/Option";
import { useOptionStore } from "../stores/useOptionStore";
import styles from "./WelcomeScreen.module.css";

export default function WelcomeScreen() {
	const { setOption } = useOptionStore();
	const router = useRouter();
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
			<h1 className={styles.header}>화면을 터치해 주문하세요</h1>
			<div className={styles.options}>
				<button
					type="button"
					className={styles.option}
					onClick={handleClick}
					data-option="forHere"
				>
					매장 식사
				</button>
				<button
					type="button"
					className={styles.option}
					onClick={handleClick}
					data-option="toGo"
				>
					포장
				</button>
			</div>
		</section>
	);
}
