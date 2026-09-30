"use client";

import Image from "next/image";
import { useState } from "react";
import useAddToCart, { DISH_DRAG_TYPE } from "../hooks/useAddToCart";
import useTranslation from "../i18n/useTranslation";
import removeDiacritics from "../helpers/removeDiacritics";
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
	const mutate = useAddToCart();
	const addToCart = () => mutate(dish);
	const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		// 담기 버튼을 눌렀을 때는 모달을 열지 않음
		event.stopPropagation();
		addToCart();
	};
	// 카드를 Invoice로 끌어다 놓으면 담을 수 있도록 요리 데이터를 실어 보냄
	const dragStartHandler = (event: React.DragEvent<HTMLElement>) => {
		// 모달은 카드 안에 렌더링되므로 모달 안에서의 드래그는 무시함
		if (isModalOpen) {
			event.preventDefault();
			return;
		}
		event.dataTransfer.setData(DISH_DRAG_TYPE, JSON.stringify(dish));
		event.dataTransfer.effectAllowed = "copy";
	};
	return (
		<section
			className={styles.section}
			draggable
			onDragStart={dragStartHandler}
			onClick={() => setIsModalOpen(true)}
		>
			<Image
				src={`/assets/images/${imageURL}.jpg`}
				alt={name}
				width={120}
				height={120}
				// 이미지만 따로 끌리지 않고 카드 전체가 끌리도록 함
				draggable={false}
				className={styles.image}
			/>
			{favorite && <div className={styles.favorite}>👍</div>}
			<div>
				<h2 className={styles.name}>{name}</h2>
				{name !== subname && (
					<p className={styles.subname}>{subname}</p>
				)}
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
