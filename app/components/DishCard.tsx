"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import cartAPI from "../api/cartAPI";
import useTranslation from "../i18n/useTranslation";
import removeDiacritics from "../helpers/removeDiacritics";
import CartDish from "../types/CartDish";
import Dish from "../types/Dish";
import styles from "./DishCard.module.css";
import DishModal from "./DishModal";

export default function DishCard({ dish }: { dish: Dish }) {
	const { subname, price, favorite } = dish;
	const { t, dishName } = useTranslation();
	const name = dishName(dish);
	const imageURL = removeDiacritics(subname)
		.toLowerCase()
		.replaceAll(" ", "-");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const addToCart = () => mutate(dish);
	const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		// 담기 버튼을 눌렀을 때는 모달을 열지 않음
		event.stopPropagation();
		addToCart();
	};
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		scope: { id: "cart" },
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
		<section
			className={styles.section}
			onClick={() => setIsModalOpen(true)}
		>
			<Image
				src={`/assets/images/${imageURL}.jpg`}
				alt={name}
				width={120}
				height={120}
				className={styles.image}
			/>
			{favorite && <div className={styles.favorite}>👍</div>}
			<div>
				<h2 className={styles.name}>{name}</h2>
				<p className={styles.subname}>{subname}</p>
				<p className={styles.price}>{t.price(price)}</p>
			</div>
			<button
				type="button"
				className={styles.addButton}
				onClick={clickHandler}
			>
				{t.add}
			</button>
			{isModalOpen && (
				<DishModal
					dish={dish}
					imageURL={imageURL}
					onAdd={addToCart}
					onClose={() => setIsModalOpen(false)}
				/>
			)}
		</section>
	);
}
