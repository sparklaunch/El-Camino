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
		// 연속 클릭 시 이전 요청의 카트 갱신이 끝난 뒤에 다음 요청이 실행되도록 순서대로 처리
		scope: { id: "cart" },
		// 이미 담긴 요리면 새로 추가하지 않고 수량만 늘림
		mutationFn: (dish: Dish) => {
			const cart = queryClient.getQueryData<CartDish[]>(["cart"]) ?? [];
			const cartDish = cart.find((item) => item.dishId === dish.id);
			return cartDish ?
					cartAPI.updateQuantity({
						id: cartDish.id,
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
