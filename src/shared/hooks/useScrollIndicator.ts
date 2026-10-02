import { RefObject, useCallback, useEffect, useState } from "react";

// 가로 스크롤 영역에서 현재 보이는 부분의 위치와 크기를 % 단위로 계산
export default function useScrollIndicator(ref: RefObject<HTMLElement | null>) {
	const [thumb, setThumb] = useState({ left: 0, width: 100 });
	const updateThumb = useCallback(() => {
		const element = ref.current;
		if (!element || element.scrollWidth === 0) {
			return;
		}
		setThumb({
			left: (element.scrollLeft / element.scrollWidth) * 100,
			width: (element.clientWidth / element.scrollWidth) * 100
		});
	}, [ref]);
	useEffect(() => {
		const element = ref.current;
		if (!element) {
			return;
		}
		const observer = new ResizeObserver(updateThumb);
		observer.observe(element);
		return () => observer.disconnect();
	}, [ref, updateThumb]);
	return { thumb, updateThumb };
}
