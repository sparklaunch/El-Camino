"use client";

import Image from "next/image";
import removeDiacritics from "../helpers/removeDiacritics";
import { useCartStore } from "../stores/useCartStore";
import Dish from "../types/Dish";
import styles from "./DishCard.module.css";

export default function DishCard({ dish }: { dish: Dish }) {
	const { addToCart } = useCartStore();
	const { name, subname, price, favorite } = dish;
	const imageURL = removeDiacritics(subname)
		.toLowerCase()
		.replaceAll(" ", "-");
	const clickHandler = () => {
		addToCart(dish);
	};
	return (
		<section className={styles.section} onClick={clickHandler}>
			<Image
				src={`/assets/images/${imageURL}.jpg`}
				alt={name}
				width={160}
				height={160}
				className={styles.image}
			/>
			{favorite && <div className={styles.favorite}>👍</div>}
			<div>
				<h2 className={styles.name}>{name}</h2>
				<p className={styles.subname}>{subname}</p>
				<p className={styles.price}>{price.toLocaleString()}</p>
			</div>
		</section>
	);
}
