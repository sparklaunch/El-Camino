import Image from "next/image";
import removeDiacritics from "../helpers/removeDiacritics";
import Dish from "../types/Dish";
import styles from "./DishCard.module.css";

export default function DishCard({ dish }: { dish: Dish }) {
	const { name, subname } = dish;
	const imageURL = removeDiacritics(subname)
		.toLowerCase()
		.replaceAll(" ", "-");
	return (
		<section className={styles.section}>
			<Image
				src={`/assets/images/${imageURL}.jpg`}
				alt={name}
				width={100}
				height={100}
			/>
		</section>
	);
}
