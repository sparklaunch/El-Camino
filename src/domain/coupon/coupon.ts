// 쿠폰 번호 = 무작위 본문 13자리 + 검증 코드 3자리 (총 16자리, 알파벳 대문자·숫자)
// 검증 코드는 비밀 키와 본문을 해시해서 만들기 때문에,
// 이 함수로 만든 번호만 검증을 통과함 (무작위로 맞힐 확률은 1/46,656)
// 주의: 클라이언트 코드에 키가 포함되므로 보안이 필요한 곳에는 서버 검증을 써야 함

export const COUPON_LENGTH = 16;
// 올바른 쿠폰을 적용하면 모든 음식에 적용되는 할인율
export const COUPON_DISCOUNT_RATE = 0.5;
const CHECK_LENGTH = 3;
const BODY_LENGTH = COUPON_LENGTH - CHECK_LENGTH;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const SECRET = "el-camino-tapas-2026";

// FNV-1a 32비트 해시
function hash(text: string): number {
	let result = 0x811c9dc5;
	for (let i = 0; i < text.length; i++) {
		result ^= text.charCodeAt(i);
		result = Math.imul(result, 0x01000193);
	}
	return result >>> 0;
}

// 본문으로부터 검증 코드 3자리를 계산
function checksum(body: string): string {
	let value = hash(SECRET + body) % ALPHABET.length ** CHECK_LENGTH;
	let result = "";
	for (let i = 0; i < CHECK_LENGTH; i++) {
		result = ALPHABET[value % ALPHABET.length] + result;
		value = Math.floor(value / ALPHABET.length);
	}
	return result;
}

export function generateCoupon(): string {
	const values = crypto.getRandomValues(new Uint32Array(BODY_LENGTH));
	const body = Array.from(
		values,
		(value) => ALPHABET[value % ALPHABET.length]
	).join("");
	return body + checksum(body);
}

export function isValidCoupon(code: string): boolean {
	if (!new RegExp(`^[A-Z0-9]{${COUPON_LENGTH}}$`).test(code)) {
		return false;
	}
	const body = code.slice(0, BODY_LENGTH);
	return code.slice(BODY_LENGTH) === checksum(body);
}

// 입력값에서 알파벳·숫자만 남기고 대문자로 바꿔 16자리까지 자름
export function normalizeCoupon(value: string): string {
	return value
		.replace(/[^a-zA-Z0-9]/g, "")
		.toUpperCase()
		.slice(0, COUPON_LENGTH);
}

// 읽기 쉽도록 4자리마다 하이픈을 넣어 표시 (XXXX-XXXX-XXXX-XXXX)
export function formatCoupon(code: string): string {
	return code.match(/.{1,4}/g)?.join("-") ?? "";
}
