import Dish from "../types/Dish";

export default function CartItem({ dish }: { dish: Dish }) {
	return <section>{dish.name}</section>;
}
