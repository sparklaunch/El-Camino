import { useEffect, useRef } from "react";

// dialog를 열고, 닫을 때는 페이드 아웃 애니메이션이 끝난 뒤에 onClose를 호출함
export default function useModal(onClose: () => void) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const isClosingRef = useRef(false);
	useEffect(() => {
		dialogRef.current?.showModal();
	}, []);
	const close = async () => {
		const dialog = dialogRef.current;
		if (!dialog || isClosingRef.current) {
			return;
		}
		isClosingRef.current = true;
		dialog.dataset.closing = "";
		// 애니메이션이 없으면(동작 줄이기 설정 등) 바로 닫힘
		await Promise.allSettled(
			dialog.getAnimations({ subtree: true }).map((animation) => animation.finished)
		);
		onClose();
	};
	// Esc 키로 닫을 때도 즉시 사라지지 않고 애니메이션을 거치도록 함
	const cancelHandler = (event: React.SyntheticEvent<HTMLDialogElement>) => {
		event.preventDefault();
		close();
	};
	return { dialogRef, close, cancelHandler };
}
