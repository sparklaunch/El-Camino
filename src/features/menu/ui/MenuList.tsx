"use client";

import { ViewTransition } from "react";
import Category, { categories } from "@/domain/menu/Category";
import Dish from "@/domain/menu/Dish";
import useTranslation from "@/i18n/useTranslation";
import DishCard from "./DishCard";
import styles from "./MenuList.module.css";

export default function MenuList({
	dishes,
	registerSection,
	onScroll
}: {
	dishes: Dish[];
	registerSection: (category: Category) => (element: HTMLElement | null) => void;
	onScroll: (event: React.UIEvent<HTMLElement>) => void;
}) {
	const { t } = useTranslation();
	return (
		<ViewTransition update="menu-fade" default="none">
			<article className={styles.menu} onScroll={onScroll}>
				{categories.map(({ value, spanishName }) => {
					const sectionDishes = dishes.filter((dish) => dish.category === value);
					return (
						<section
							key={value}
							ref={registerSection(value)}
							className={styles.menuSection}
						>
							<hr className={styles.sectionLine} />
							<h2 className={styles.sectionTitle}>
								{t.categories[value]}
								<span className={styles.sectionSubtitle}>{spanishName}</span>
							</h2>
							{sectionDishes.length > 0 ? (
								<div className={styles.dishGrid}>
									{sectionDishes.map((dish) => (
										<DishCard key={dish.id} dish={dish} />
									))}
								</div>
							) : (
								<p className={styles.noDishes}>{t.noDishes}</p>
							)}
						</section>
					);
				})}
			</article>
		</ViewTransition>
	);
}
