"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Diet from "@/domain/menu/Diet";
import { Invoice } from "@/features/cart";
import {
	CategoryNav,
	DietFilter,
	MenuList,
	useCategoryScrollSpy,
	useDishes
} from "@/features/menu";
import useTranslation from "@/i18n/useTranslation";
import logo from "@/shared/assets/logo.png";
import ErrorScreen from "@/shared/ui/ErrorScreen";
import LoadingScreen from "@/shared/ui/LoadingScreen";
import PageTransition from "@/shared/ui/PageTransition";
import styles from "./Main.module.css";

export default function Main() {
	const { t } = useTranslation();
	const [dietFilter, setDietFilter] = useState<Diet>();
	const { data: dishes, isPending, isError, error, refetch, isRefetching } =
		useDishes(dietFilter);
	const { category, selectCategory, registerSection, menuScrollHandler } =
		useCategoryScrollSpy();
	if (isPending) {
		return (
			<PageTransition>
				<LoadingScreen label={t.loading} />
			</PageTransition>
		);
	}
	if (isError) {
		return (
			<PageTransition>
				<ErrorScreen
					title={t.error}
					message={error.message}
					retryLabel={t.retry}
					retryingLabel={t.loading}
					onRetry={() => refetch()}
					isRetrying={isRefetching}
				/>
			</PageTransition>
		);
	}
	return (
		<PageTransition>
			<div className={styles.main}>
				<Link href="/" className={styles.link}>
					<Image src={logo} alt="Go home" className={styles.logo} />
				</Link>
				<hr className={styles.horizontalLine} />
				<div className={styles.body}>
					<div className={styles.categoryWrapper}>
						<DietFilter value={dietFilter} onChange={setDietFilter} />
						<CategoryNav active={category} onSelect={selectCategory} />
					</div>
					<MenuList
						dishes={dishes}
						registerSection={registerSection}
						onScroll={menuScrollHandler}
					/>
					<Invoice />
				</div>
			</div>
		</PageTransition>
	);
}
