// 사용법: npm run coupon -- [개수]
import { generateCoupon } from "../app/helpers/coupon.ts";

const count = Number(process.argv[2] ?? 1);
for (let i = 0; i < count; i++) {
	console.log(generateCoupon());
}
