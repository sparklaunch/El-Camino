"use client";

import { clsx } from "clsx";
import { startTransition } from "react";
import Diet from "@/domain/menu/Diet";
import useTranslation from "@/i18n/useTranslation";
import dietIcon from "../lib/dietIcon";
import styles from "./DietFilter.module.css";

export default function DietFilter({
	value,
	onChange
}: {
	value?: Diet;
	onChange: (diet?: Diet) => void;
}) {
	const { t } = useTranslation();
	const options = [
		{ value: undefined, label: t.allDishes },
		...Object.values(Diet).map((diet) => ({
			value: diet,
			label: `${dietIcon[diet]} ${t.diets[diet]}`
		}))
	];
	return (
		<div className={styles.dietFilter} role="group" aria-label={t.dietFilter}>
			{options.map((option) => (
				<button
					key={option.value ?? "all"}
					type="button"
					className={clsx(styles.dietButton, {
						[styles.dietActive]: value === option.value
					})}
					aria-pressed={value === option.value}
					// 트랜지션으로 감싸 메뉴 목록이 페이드되며 바뀌도록 함
					onClick={() => startTransition(() => onChange(option.value))}
				>
					{option.label}
				</button>
			))}
		</div>
	);
}
