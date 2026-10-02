// 사용법: npm run coupon -- [개수]
import { generateCoupon } from "../src/domain/coupon/coupon.ts";

const count = Number(process.argv[2] ?? 1);
for (let i = 0; i < count; i++) {
	console.log(generateCoupon());
}
