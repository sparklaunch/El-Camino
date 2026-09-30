"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import useTranslation from "../i18n/useTranslation";
import allergenIcon from "../helpers/allergenIcon";
import Dish from "../types/Dish";
import styles from "./DishModal.module.css";

export default function DishModal({
	dish,
	imageURL,
	onAdd,
	onClose
}: {
	dish: Dish;
	imageURL: string;
	onAdd: () => void;
	onClose: () => void;
}) {
	const { t, dishName, dishDescription } = useTranslation();
	const dialogRef = useRef<HTMLDialogElement>(null);
	useEffect(() => {
		dialogRef.current?.showModal();
	}, []);
	const name = dishName(dish);
	const description = dishDescription(dish);
	const clickHandler = (event: React.MouseEvent<HTMLDialogElement>) => {
		// 모달 안의 클릭이 DishCard로 전달되어 모달이 다시 열리지 않도록 막음
		event.stopPropagation();
		// 내용 영역 바깥(배경)을 클릭하면 dialog 자체가 target이 됨
		if (event.target === event.currentTarget) {
			onClose();
		}
	};
	const addHandler = () => {
		onAdd();
		onClose();
	};
	return (
		<dialog
			ref={dialogRef}
			className={styles.dialog}
			onClick={clickHandler}
			onClose={onClose}
		>
			<div className={styles.content}>
				<Image
					src={`/assets/images/${imageURL}.jpg`}
					alt={name}
					width={400}
					height={300}
					className={styles.image}
				/>
				<div className={styles.tags}>
					<span className={styles.tag}>
						{t.categories[dish.category]}
					</span>
					{dish.favorite && (
						<span className={styles.tag}>👍 {t.favorite}</span>
					)}
				</div>
				<h2 className={styles.name}>{name}</h2>
				{name !== dish.subname && (
					<p className={styles.subname}>{dish.subname}</p>
				)}
				{description && (
					<p className={styles.description}>{description}</p>
				)}
				{dish.allergens && dish.allergens.length > 0 && (
					<div className={styles.allergenSection}>
						<p className={styles.allergenTitle}>
							⚠️ {t.allergenTitle}
						</p>
						<ul className={styles.tags}>
							{dish.allergens.map((allergen) => (
								<li
									key={allergen}
									className={styles.allergenTag}
								>
									{allergenIcon[allergen]}{" "}
									{t.allergens[allergen]}
								</li>
							))}
						</ul>
					</div>
				)}
				<p className={styles.price}>{t.price(dish.price)}</p>
				<div className={styles.buttons}>
					<button
						type="button"
						className={styles.closeButton}
						onClick={onClose}
					>
						{t.close}
					</button>
					<button
						type="button"
						className={styles.addButton}
						onClick={addHandler}
					>
						{t.add}
					</button>
				</div>
			</div>
		</dialog>
	);
}
