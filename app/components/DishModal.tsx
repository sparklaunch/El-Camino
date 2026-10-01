"use client";

import { clsx } from "clsx";
import Image from "next/image";
import allergenIcon from "../helpers/allergenIcon";
import dietIcon from "../helpers/dietIcon";
import useModal from "../hooks/useModal";
import useTranslation from "../i18n/useTranslation";
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
	const { dialogRef, close, cancelHandler } = useModal(onClose);
	const name = dishName(dish);
	const description = dishDescription(dish);
	const clickHandler = (event: React.MouseEvent<HTMLDialogElement>) => {
		// 모달 안의 클릭이 DishCard로 전달되어 모달이 다시 열리지 않도록 막음
		event.stopPropagation();
		// 내용 영역 바깥(배경)을 클릭하면 dialog 자체가 target이 됨
		if (event.target === event.currentTarget) {
			close();
		}
	};
	const addHandler = () => {
		onAdd();
		close();
	};
	return (
		<dialog
			ref={dialogRef}
			className={styles.dialog}
			onClick={clickHandler}
			onCancel={cancelHandler}
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
					{dish.diet && (
						<span className={clsx(styles.tag, styles.dietTag)}>
							{dietIcon[dish.diet]} {t.diets[dish.diet]}
						</span>
					)}
				</div>
				<div className={styles.nameWrapper}>
					<h2 className={styles.name}>{name}</h2>
					{name !== dish.subname && (
						<p className={styles.subname}>{dish.subname}</p>
					)}
				</div>
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
						onClick={close}
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
