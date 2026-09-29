"use client";

import Category from "@/app/enums/Category";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../assets/images/logo.png";
import styles from "./CartPage.module.css";

export default function CartPage() {
	const [category, setCategory] = useState<Category | null>(null);
	const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		const { classification } = event.currentTarget.dataset;
		switch (classification) {
			case "all":
				setCategory(null);
				break;
			case "tapas":
				setCategory(Category.tapas);
				break;
			case "paella":
				setCategory(Category.paella);
				break;
			case "principales":
				setCategory(Category.principales);
				break;
			case "postre":
				setCategory(Category.postre);
				break;
			case "bebidas":
				setCategory(Category.bebidas);
				break;
		}
	};
	return (
		<section className={styles.section}>
			<Link href="/" className={styles.link}>
				<Image src={logo} alt="Go home" className={styles.logo} />
			</Link>
			<hr className={styles.horizontalLine} />
			<div className={styles.grid}>
				<section className={styles.body}>
					<ul className={styles.filterList}>
						<li>
							<button
								type="button"
								className={clsx(styles.filterButton, {
									[styles.active]: !category
								})}
								onClick={clickHandler}
								data-classification="all"
							>
								모두
							</button>
						</li>
						<li>
							<button
								type="button"
								className={clsx(styles.filterButton, {
									[styles.active]: category === Category.tapas
								})}
								onClick={clickHandler}
								data-classification="tapas"
							>
								타파스
							</button>
						</li>
						<li>
							<button
								type="button"
								className={clsx(styles.filterButton, {
									[styles.active]:
										category === Category.paella
								})}
								onClick={clickHandler}
								data-classification="paella"
							>
								빠에야
							</button>
						</li>
						<li>
							<button
								type="button"
								className={clsx(styles.filterButton, {
									[styles.active]:
										category === Category.principales
								})}
								onClick={clickHandler}
								data-classification="principales"
							>
								메인 요리
							</button>
						</li>
						<li>
							<button
								type="button"
								className={clsx(styles.filterButton, {
									[styles.active]:
										category === Category.postre
								})}
								onClick={clickHandler}
								data-classification="postre"
							>
								디저트
							</button>
						</li>
						<li>
							<button
								type="button"
								className={clsx(styles.filterButton, {
									[styles.active]:
										category === Category.bebidas
								})}
								onClick={clickHandler}
								data-classification="bebidas"
							>
								음료
							</button>
						</li>
					</ul>
				</section>
				<aside className={styles.aside}></aside>
			</div>
		</section>
	);
}
