"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import cartAPI from "../api/cartAPI";
import removeDiacritics from "../helpers/removeDiacritics";
import CartDish from "../types/CartDish";
import styles from "./CartItem.module.css";

export default function CartItem({ dish }: { dish: CartDish }) {
	const { id, subname, name, quantity } = dish;
	const image = removeDiacritics(subname).toLowerCase().replaceAll(" ", "-");
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: cartAPI.updateQuantity,
		// 서버 응답을 기다리지 않고 화면의 수량을 먼저 바꿈
		onMutate: async ({ quantity }) => {
			await queryClient.cancelQueries({ queryKey: ["cart"] });
			const previousCart = queryClient.getQueryData<CartDish[]>(["cart"]);
			queryClient.setQueryData<CartDish[]>(["cart"], (cart) =>
				cart?.map((item) =>
					item.id === id ? { ...item, quantity } : item
				)
			);
			return { previousCart };
		},
		onError: (error, _variables, context) => {
			console.error(error);
			queryClient.setQueryData(["cart"], context?.previousCart);
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey: ["cart"] })
	});
	const { mutate: deleteMutate } = useMutation({
		mutationFn: cartAPI.deleteFromCart,
		// 담기·수량 변경 요청과 섞이지 않도록 순서대로 처리
		scope: { id: "cart" },
		// 서버 응답을 기다리지 않고 화면에서 항목을 먼저 지움
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ["cart"] });
			const previousCart = queryClient.getQueryData<CartDish[]>(["cart"]);
			queryClient.setQueryData<CartDish[]>(["cart"], (cart) =>
				cart?.filter((item) => item.id !== id)
			);
			return { previousCart };
		},
		onError: (error, _variables, context) => {
			console.error(error);
			queryClient.setQueryData(["cart"], context?.previousCart);
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey: ["cart"] })
	});
	const deleteHandler = () => deleteMutate(id);
	const decreaseHandler = () => mutate({ id, quantity: quantity - 1 });
	const increaseHandler = () => mutate({ id, quantity: quantity + 1 });
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
				<h2 className={styles.name}>{name}</h2>
				<p className={styles.subname}>{subname}</p>
				<div></div>
			</div>
			<div className={styles.quantity}>
				<button
					type="button"
					className={styles.quantityButton}
					onClick={decreaseHandler}
					disabled={quantity <= 1}
				>
					-
				</button>
				<p>{quantity}</p>
				<button
					type="button"
					className={styles.quantityButton}
					onClick={increaseHandler}
				>
					+
				</button>
			</div>
			<button
				type="button"
				className={styles.trashBin}
				onClick={deleteHandler}
			>
				🗑️
			</button>
		</section>
	);
}
