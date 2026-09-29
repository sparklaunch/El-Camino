"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import cartAPI from "../api/cartAPI";
import removeDiacritics from "../helpers/removeDiacritics";
import CartDish from "../types/CartDish";
import Dish from "../types/Dish";
import styles from "./DishCard.module.css";

export default function DishCard({ dish }: { dish: Dish }) {
	const { name, subname, price, favorite } = dish;
	const imageURL = removeDiacritics(subname)
		.toLowerCase()
		.replaceAll(" ", "-");
	const clickHandler = () => mutate(dish);
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		// 이미 담긴 요리면 새로 추가하지 않고 수량만 늘림
		mutationFn: (dish: Dish) => {
			const cart = queryClient.getQueryData<CartDish[]>(["cart"]) ?? [];
			const cartDish = cart.find((item) => item.id === dish.id);
			return cartDish ?
					cartAPI.updateQuantity({
						id: dish.id,
						quantity: cartDish.quantity + 1
					})
				:	cartAPI.addToCart(dish);
		},
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: ["cart"]
			})
	});
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
