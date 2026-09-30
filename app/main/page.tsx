"use client";

import { useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import dishAPI from "../api/dishAPI";
import logo from "../assets/images/logo.png";
import DishCard from "../components/DishCard";
import Invoice from "../components/Invoice";
import Category from "../enums/Category";
import useTranslation from "../i18n/useTranslation";
import Dish from "../types/Dish";
import styles from "./Main.module.css";

const categories = [
	{ value: Category.tapas, subtitle: "Tapas" },
	{ value: Category.paella, subtitle: "Paella" },
	{ value: Category.principales, subtitle: "Principales" },
	{ value: Category.postre, subtitle: "Postre" },
	{ value: Category.bebidas, subtitle: "Bebidas" }
];

export default function Main() {
	const [category, setCategory] = useState(Category.tapas);
	const { t } = useTranslation();
	const sectionRefs = useRef<Partial<Record<Category, HTMLElement | null>>>({});
	const { data, isPending, isError, error } = useQuery({
		queryKey: ["dishes"],
		queryFn: () => dishAPI.fetchDishes()
	});
	const categoryRef = useRef<HTMLElement>(null);
	// 가로 스크롤 인디케이터의 위치와 크기 (% 단위)
	const [thumb, setThumb] = useState({ left: 0, width: 100 });
	const updateThumb = () => {
		const category = categoryRef.current;
		if (!category || category.scrollWidth === 0) {
			return;
		}
		setThumb({
			left: (category.scrollLeft / category.scrollWidth) * 100,
			width: (category.clientWidth / category.scrollWidth) * 100
		});
	};
	useEffect(() => {
		const category = categoryRef.current;
		if (!category) {
			return;
		}
		const observer = new ResizeObserver(updateThumb);
		observer.observe(category);
		return () => observer.disconnect();
	}, [isPending, isError]);
	// 버튼 클릭으로 부드럽게 스크롤되는 동안에는 중간 카테고리가 선택되지 않도록 목표 카테고리를 고정
	const scrollTargetRef = useRef<Category | null>(null);
	const scrollTargetTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
	const clickHandler = (value: Category) => {
		setCategory(value);
		scrollTargetRef.current = value;
		clearTimeout(scrollTargetTimerRef.current);
		// 스크롤이 목표에 도달하지 못하거나 사용자가 중간에 스크롤한 경우를 대비한 해제
		scrollTargetTimerRef.current = setTimeout(() => {
			scrollTargetRef.current = null;
		}, 1000);
		sectionRefs.current[value]?.scrollIntoView({ behavior: "smooth", block: "start" });
	};
	// 메뉴 스크롤 위치에 따라 현재 보고 있는 카테고리를 선택
	const menuScrollHandler = (event: React.UIEvent<HTMLElement>) => {
		const menu = event.currentTarget;
		const menuTop = menu.getBoundingClientRect().top;
		let current = categories[0].value;
		// 맨 아래까지 스크롤하면 마지막 섹션이 위에 닿지 못하더라도 마지막 카테고리를 선택
		if (menu.scrollTop + menu.clientHeight >= menu.scrollHeight - 1) {
			current = categories[categories.length - 1].value;
		} else {
			for (const { value } of categories) {
				const section = sectionRefs.current[value];
				if (section && section.getBoundingClientRect().top - menuTop <= 10) {
					current = value;
				}
			}
		}
		if (scrollTargetRef.current !== null) {
			if (current === scrollTargetRef.current) {
				scrollTargetRef.current = null;
				clearTimeout(scrollTargetTimerRef.current);
			}
			return;
		}
		setCategory(current);
	};
	// 가로 카테고리 바(좁은 화면)에서 선택된 버튼이 보이도록 스크롤
	useEffect(() => {
		const aside = categoryRef.current;
		const button = aside?.children[categories.findIndex(({ value }) => value === category)];
		if (!aside || !(button instanceof HTMLElement) || aside.scrollWidth <= aside.clientWidth) {
			return;
		}
		aside.scrollTo({
			left: button.offsetLeft - aside.offsetLeft - (aside.clientWidth - button.offsetWidth) / 2,
			behavior: "smooth"
		});
	}, [category]);
	if (isPending) {
		return <p>{t.loading}</p>;
	}
	if (isError) {
		return (
			<p>
				{t.error} {error.message}
			</p>
		);
	}
	const dishes: Dish[] = data ?? [];
	return (
		<div className={styles.main}>
			<Link href="/" className={styles.link}>
				<Image src={logo} alt="Go home" className={styles.logo} />
			</Link>
			<hr className={styles.horizontalLine} />
			<div className={styles.body}>
				<div className={styles.categoryWrapper}>
					<aside
						ref={categoryRef}
						className={styles.category}
						onScroll={updateThumb}
					>
						{categories.map(({ value, subtitle }) => (
							<button
								key={value}
								type="button"
								className={clsx(styles.categoryButton, {
									[styles.active]: category === value
								})}
								onClick={() => clickHandler(value)}
							>
								<h2 className={styles.categoryTitle}>
									{t.categories[value]}
								</h2>
								<p className={styles.categorySubtitle}>
									{subtitle}
								</p>
							</button>
						))}
					</aside>
					<div className={styles.scrollIndicator}>
						<div
							className={styles.scrollThumb}
							style={{ left: `${thumb.left}%`, width: `${thumb.width}%` }}
						/>
					</div>
				</div>
				<article className={styles.menu} onScroll={menuScrollHandler}>
					{categories.map(({ value }) => (
						<section
							key={value}
							ref={(element) => {
								sectionRefs.current[value] = element;
							}}
							className={styles.menuSection}
						>
							{dishes
								.filter((dish) => dish.category === value)
								.map((dish) => (
									<DishCard key={dish.id} dish={dish} />
								))}
						</section>
					))}
				</article>
				<Invoice />
			</div>
		</div>
	);
}
