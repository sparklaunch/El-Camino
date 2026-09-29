import Image from "next/image";
import removeDiacritics from "../helpers/removeDiacritics";
import Dish from "../types/Dish";
import styles from "./DishCard.module.css";

export default function DishCard({ dish }: { dish: Dish }) {
	const { name, subname, price } = dish;
	const imageURL = removeDiacritics(subname)
		.toLowerCase()
		.replaceAll(" ", "-");
	return (
		<section className={styles.section}>
			<Image
				src={`/assets/images/${imageURL}.jpg`}
				alt={name}
				width={160}
				height={160}
				className={styles.image}
			/>
			<div>
				<h2 className={styles.name}>{name}</h2>
				<p className={styles.subname}>{subname}</p>
				<p className={styles.price}>{price.toLocaleString()}</p>
			</div>
		</section>
	);
}
