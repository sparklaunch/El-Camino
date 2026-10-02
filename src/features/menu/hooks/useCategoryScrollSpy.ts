import { useRef, useState } from "react";
import Category, { categories } from "@/domain/menu/Category";

// 카테고리 버튼과 메뉴 스크롤 위치를 서로 맞춤
export default function useCategoryScrollSpy() {
	const [category, setCategory] = useState(categories[0].value);
	const sectionRefs = useRef<Partial<Record<Category, HTMLElement | null>>>({});
	// 버튼 클릭으로 부드럽게 스크롤되는 동안에는 중간 카테고리가 선택되지 않도록 목표 카테고리를 고정
	const scrollTargetRef = useRef<Category | null>(null);
	const scrollTargetTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
	const registerSection = (value: Category) => (element: HTMLElement | null) => {
		sectionRefs.current[value] = element;
	};
	const selectCategory = (value: Category) => {
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
	return { category, selectCategory, registerSection, menuScrollHandler };
}
