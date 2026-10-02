import { useState } from "react";
import Dish from "@/domain/menu/Dish";
import { getDishDragData, hasDishDragData } from "../lib/dishDrag";

// DishCard를 끌어다 놓을 수 있는 영역을 만듦
export default function useDishDrop(onDrop: (dish: Dish) => void) {
	const [isDragOver, setIsDragOver] = useState(false);
	// DishCard를 끌고 있을 때만 드롭을 허용함
	const dragOverHandler = (event: React.DragEvent<HTMLElement>) => {
		if (!hasDishDragData(event.dataTransfer)) {
			return;
		}
		event.preventDefault();
		event.dataTransfer.dropEffect = "copy";
		setIsDragOver(true);
	};
	const dragLeaveHandler = (event: React.DragEvent<HTMLElement>) => {
		// 영역 안의 자식 요소로 이동할 때는 강조를 유지함
		if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
			return;
		}
		setIsDragOver(false);
	};
	const dropHandler = (event: React.DragEvent<HTMLElement>) => {
		event.preventDefault();
		setIsDragOver(false);
		const dish = getDishDragData(event.dataTransfer);
		if (dish) {
			onDrop(dish);
		}
	};
	return {
		isDragOver,
		dropZoneProps: {
			onDragOver: dragOverHandler,
			onDragLeave: dragLeaveHandler,
			onDrop: dropHandler
		}
	};
}
