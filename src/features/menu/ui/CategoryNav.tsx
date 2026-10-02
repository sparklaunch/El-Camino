"use client";

import { clsx } from "clsx";
import { useEffect, useRef } from "react";
import Category, { categories } from "@/domain/menu/Category";
import useTranslation from "@/i18n/useTranslation";
import useScrollIndicator from "@/shared/hooks/useScrollIndicator";
import styles from "./CategoryNav.module.css";

export default function CategoryNav({
	active,
	onSelect
}: {
	active: Category;
	onSelect: (category: Category) => void;
}) {
	const { t } = useTranslation();
	const navRef = useRef<HTMLElement>(null);
	const { thumb, updateThumb } = useScrollIndicator(navRef);
	// 가로 카테고리 바(좁은 화면)에서 선택된 버튼이 보이도록 스크롤
	useEffect(() => {
		const nav = navRef.current;
		const button = nav?.children[categories.findIndex(({ value }) => value === active)];
		if (!nav || !(button instanceof HTMLElement) || nav.scrollWidth <= nav.clientWidth) {
			return;
		}
		nav.scrollTo({
			left: button.offsetLeft - nav.offsetLeft - (nav.clientWidth - button.offsetWidth) / 2,
			behavior: "smooth"
		});
	}, [active]);
	return (
		<>
			<aside ref={navRef} className={styles.category} onScroll={updateThumb}>
				{categories.map(({ value, spanishName }) => (
					<button
						key={value}
						type="button"
						className={clsx(styles.categoryButton, {
							[styles.active]: active === value
						})}
						onClick={() => onSelect(value)}
					>
						<h2 className={styles.categoryTitle}>{t.categories[value]}</h2>
						<p className={styles.categorySubtitle}>{spanishName}</p>
					</button>
				))}
			</aside>
			<div className={styles.scrollIndicator}>
				<div
					className={styles.scrollThumb}
					style={{ left: `${thumb.left}%`, width: `${thumb.width}%` }}
				/>
			</div>
		</>
	);
}
