"use client";

import { useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import cartAPI from "../api/cartAPI";
import dishAPI from "../api/dishAPI";
import logo from "../assets/images/logo.png";
import DishCard from "../components/DishCard";
import Category from "../enums/Category";
import Dish from "../types/Dish";
import styles from "./Main.module.css";

export default function Main() {
	const router = useRouter();
	const [category, setCategory] = useState(Category.tapas);
	const { data, isPending, isError, error } = useQuery({
		queryKey: ["dishes", { category }],
		queryFn: () => dishAPI.fetchDishes(category)
	});
	const { data: cart = [] } = useQuery({
		queryKey: ["cart"],
		queryFn: cartAPI.fetchCart
	});
	const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
	const cartClickHandler = () => {
		router.push("/main/cart");
	};
	const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		const { classification } = event.currentTarget.dataset;
		switch (classification) {
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
	if (isPending) {
		return <p>로딩중...</p>;
	}
	if (isError) {
		return <p>에러가 발생했어: {error.message}</p>;
	}
	return (
		<div className={styles.main}>
			<Link href="/" className={styles.link}>
				<Image src={logo} alt="Go home" className={styles.logo} />
			</Link>
			<div className={styles.cartWrapper}>
				<button
					type="button"
					className={styles.cart}
					onClick={cartClickHandler}
				>
					🛒
				</button>
				<div className={styles.cartBadgeWrapper}>
					<p className={styles.cartBadge}>{cartCount}</p>
				</div>
			</div>
			<hr className={styles.horizontalLine} />
			<div className={styles.body}>
				<aside className={styles.category}>
					<button
						type="button"
						className={clsx(styles.categoryButton, {
							[styles.active]: category === Category.tapas
						})}
						onClick={clickHandler}
						data-classification="tapas"
					>
						<h2 className={styles.categoryTitle}>타파스</h2>
						<p className={styles.categorySubtitle}>Tapas</p>
					</button>
					<button
						type="button"
						className={clsx(styles.categoryButton, {
							[styles.active]: category === Category.paella
						})}
						onClick={clickHandler}
						data-classification="paella"
					>
						<h2 className={styles.categoryTitle}>빠에야</h2>
						<p className={styles.categorySubtitle}>Paella</p>
					</button>
					<button
						type="button"
						className={clsx(styles.categoryButton, {
							[styles.active]: category === Category.principales
						})}
						onClick={clickHandler}
						data-classification="principales"
					>
						<h2 className={styles.categoryTitle}>메인 요리</h2>
						<p className={styles.categorySubtitle}>Principales</p>
					</button>
					<button
						type="button"
						className={clsx(styles.categoryButton, {
							[styles.active]: category === Category.postre
						})}
						onClick={clickHandler}
						data-classification="postre"
					>
						<h2 className={styles.categoryTitle}>디저트</h2>
						<p className={styles.categorySubtitle}>Postre</p>
					</button>
					<button
						type="button"
						className={clsx(styles.categoryButton, {
							[styles.active]: category === Category.bebidas
						})}
						onClick={clickHandler}
						data-classification="bebidas"
					>
						<h2 className={styles.categoryTitle}>음료</h2>
						<p className={styles.categorySubtitle}>Bebidas</p>
					</button>
				</aside>
				<article className={styles.menu}>
					{data.map((dish: Dish) => (
						<DishCard key={dish.id} dish={dish} />
					))}
				</article>
			</div>
		</div>
	);
}
