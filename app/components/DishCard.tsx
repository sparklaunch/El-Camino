import Dish from "../types/Dish";
import styles from "./DishCard.module.css";

export default function DishCard({ dish }: { dish: Dish }) {
	return <section className={styles.section}>{dish.name}</section>;
}
