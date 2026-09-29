"use client";

import { useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import dishAPI from "../api/dishAPI";
import logo from "../assets/images/logo.png";
import DishCard from "../components/DishCard";
import Invoice from "../components/Invoice";
import Category from "../enums/Category";
import useTranslation from "../i18n/useTranslation";
import Dish from "../types/Dish";
import styles from "./Main.module.css";

const categories = [
	{ value: Category.tapas, subtitle: "Tapas" },
	{ value: Category.paella, subtitle: "Paella" },
	{ value: Category.principales, subtitle: "Principales" },
	{ value: Category.postre, subtitle: "Postre" },
	{ value: Category.bebidas, subtitle: "Bebidas" }
];

export default function Main() {
	const [category, setCategory] = useState(Category.tapas);
	const { t } = useTranslation();
	const sectionRefs = useRef<Partial<Record<Category, HTMLElement | null>>>({});
	const { data, isPending, isError, error } = useQuery({
		queryKey: ["dishes"],
		queryFn: () => dishAPI.fetchDishes()
	});
	const clickHandler = (value: Category) => {
		setCategory(value);
		sectionRefs.current[value]?.scrollIntoView({ behavior: "smooth", block: "start" });
	};
	if (isPending) {
		return <p>{t.loading}</p>;
	}
	if (isError) {
		return (
			<p>
				{t.error} {error.message}
			</p>
		);
	}
	const dishes: Dish[] = data ?? [];
	return (
		<div className={styles.main}>
			<Link href="/" className={styles.link}>
				<Image src={logo} alt="Go home" className={styles.logo} />
			</Link>
			<hr className={styles.horizontalLine} />
			<div className={styles.body}>
				<aside className={styles.category}>
					{categories.map(({ value, subtitle }) => (
						<button
							key={value}
							type="button"
							className={clsx(styles.categoryButton, {
								[styles.active]: category === value
							})}
							onClick={() => clickHandler(value)}
						>
							<h2 className={styles.categoryTitle}>
								{t.categories[value]}
							</h2>
							<p className={styles.categorySubtitle}>
								{subtitle}
							</p>
						</button>
					))}
				</aside>
				<article className={styles.menu}>
					{categories.map(({ value }) => (
						<section
							key={value}
							ref={(element) => {
								sectionRefs.current[value] = element;
							}}
							className={styles.menuSection}
						>
							{dishes
								.filter((dish) => dish.category === value)
								.map((dish) => (
									<DishCard key={dish.id} dish={dish} />
								))}
						</section>
					))}
				</article>
				<Invoice />
			</div>
		</div>
	);
}
