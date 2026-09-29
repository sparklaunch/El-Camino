"use client";

import cartAPI from "@/app/api/cartAPI";
import CartItem from "@/app/components/CartItem";
import Category from "@/app/enums/Category";
import { useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../assets/images/logo.png";
import styles from "./CartPage.module.css";

const FILTERS: { value: Category | null; label: string }[] = [
	{ value: null, label: "모두" },
	{ value: Category.tapas, label: "타파스" },
	{ value: Category.paella, label: "빠에야" },
	{ value: Category.principales, label: "메인 요리" },
	{ value: Category.postre, label: "디저트" },
	{ value: Category.bebidas, label: "음료" }
];

export default function CartPage() {
	const [category, setCategory] = useState<Category | null>(null);
	const { data = [] } = useQuery({
		queryKey: ["cart"],
		queryFn: cartAPI.fetchCart
	});
	const filteredData =
		category ?
			data.filter((dish) => dish.category === category)
		:	data;
	const counts = data.reduce(
		(acc: Partial<Record<Category, number>>, dish) => {
			acc[dish.category] = (acc[dish.category] ?? 0) + 1;
			return acc;
		},
		{}
	);
	return (
		<section className={styles.section}>
			<Link href="/" className={styles.link}>
				<Image src={logo} alt="Go home" className={styles.logo} />
			</Link>
			<hr className={styles.horizontalLine} />
			<div className={styles.grid}>
				<section className={styles.body}>
					<ul className={styles.filterList}>
						{FILTERS.map(({ value, label }) => {
							const count =
								value ? (counts[value] ?? 0) : data.length;
							return (
								<li key={value ?? "all"}>
									<button
										type="button"
										className={clsx(styles.filterButton, {
											[styles.active]: category === value
										})}
										onClick={() => setCategory(value)}
									>
										{label} {count > 0 && `(${count})`}
									</button>
								</li>
							);
						})}
					</ul>
					<div>
						{filteredData.map((dish) => (
							<CartItem key={dish.id} dish={dish} />
						))}
					</div>
				</section>
				<aside className={styles.aside}></aside>
			</div>
		</section>
	);
}
