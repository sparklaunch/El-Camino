import Image from "next/image";
import removeDiacritics from "../helpers/removeDiacritics";
import Dish from "../types/Dish";
import styles from "./CartItem.module.css";

export default function CartItem({ dish }: { dish: Dish }) {
	const { subname, name } = dish;
	const image = removeDiacritics(subname).toLowerCase().replaceAll(" ", "-");
	return (
		<section className={styles.section}>
			<Image
				src={`/assets/images/${image}.jpg`}
				alt={subname}
				width={160}
				height={160}
				className={styles.image}
			/>
			<div>
				<h2>{name}</h2>
				<p>{subname}</p>
			</div>
		</section>
	);
}
