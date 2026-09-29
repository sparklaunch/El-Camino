"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../assets/images/logo.png";
import useTranslation from "../i18n/useTranslation";
import styles from "./Complete.module.css";

export default function Complete() {
	const { t } = useTranslation();
	return (
		<main className={styles.main}>
			<section className={styles.complete}>
				<Image
					src={logo}
					alt="El Camino Logo"
					className={styles.logo}
				/>
				<h1 className={styles.header}>{t.paymentComplete}</h1>
				<p className={styles.message}>{t.thanks}</p>
				<Link href="/" className={styles.homeButton}>
					{t.home}
				</Link>
			</section>
		</main>
	);
}
