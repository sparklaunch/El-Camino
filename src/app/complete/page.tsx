"use client";

import Image from "next/image";
import Link from "next/link";
import useTranslation from "@/i18n/useTranslation";
import logo from "@/shared/assets/logo.png";
import PageTransition from "@/shared/ui/PageTransition";
import styles from "./Complete.module.css";

export default function Complete() {
	const { t } = useTranslation();
	return (
		<PageTransition>
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
		</PageTransition>
	);
}
