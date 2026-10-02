import { useState } from "react";
import {
	COUPON_LENGTH,
	formatCoupon,
	isValidCoupon,
	normalizeCoupon
} from "@/domain/coupon/coupon";

export default function useCouponInput() {
	const [code, setCode] = useState("");
	const [isInvalid, setIsInvalid] = useState(false);
	const isComplete = code.length === COUPON_LENGTH;
	const change = (value: string) => {
		setCode(normalizeCoupon(value));
		setIsInvalid(false);
	};
	// 16자리를 모두 입력했을 때만 검증하고, 틀리면 에러를 표시함
	const validate = () => {
		if (!isComplete) {
			return false;
		}
		const isValid = isValidCoupon(code);
		setIsInvalid(!isValid);
		return isValid;
	};
	return {
		code,
		formattedCode: formatCoupon(code),
		isInvalid,
		isComplete,
		change,
		validate
	};
}
