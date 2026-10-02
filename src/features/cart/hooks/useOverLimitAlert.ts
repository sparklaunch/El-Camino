import { useState } from "react";

// 합계가 기준 금액을 새로 넘어서는 순간에만 알림을 띄움
export default function useOverLimitAlert(isOverLimit: boolean) {
	const [wasOverLimit, setWasOverLimit] = useState(isOverLimit);
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	if (isOverLimit !== wasOverLimit) {
		setWasOverLimit(isOverLimit);
		setIsAlertOpen(isOverLimit);
	}
	return { isAlertOpen, closeAlert: () => setIsAlertOpen(false) };
}
