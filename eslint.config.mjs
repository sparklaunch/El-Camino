import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

// 레이어 간 의존 방향: app → features → i18n → domain, shared는 어디서나 사용 가능하지만 아무것도 모름
// 각 레이어가 가져오면 안 되는 대상을 정의함 (같은 규칙을 여러 번 정의하면 덮어쓰므로 공통 규칙을 함께 넣음)
const commonPatterns = [
	{
		group: ["@/features/*/*"],
		message: "다른 feature는 index.ts(공개 API)를 통해서만 가져와야 해."
	},
	{
		group: ["../../*"],
		message: "레이어나 feature 경계를 넘을 때는 @/ 경로를 사용해야 해."
	}
];

const restrictImports = (files, groups) => ({
	files,
	rules: {
		"no-restricted-imports": [
			"error",
			{
				patterns: [
					...commonPatterns,
					...groups.map(([group, message]) => ({ group, message }))
				]
			}
		]
	}
});

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	restrictImports(["src/**/*.{ts,tsx}"], []),
	restrictImports(
		["src/features/**/*.{ts,tsx}"],
		[[["@/app/*"], "feature는 페이지(app)를 알면 안 돼."]]
	),
	restrictImports(
		["src/i18n/**/*.{ts,tsx}"],
		[[["@/app/*", "@/features/*"], "i18n은 도메인과 공용 코드만 사용할 수 있어."]]
	),
	restrictImports(
		["src/domain/**/*.{ts,tsx}"],
		[
			[
				["@/*", "react", "react-dom", "next", "next/*", "@tanstack/*", "zustand", "zustand/*"],
				"domain은 프레임워크나 다른 레이어에 의존하지 않는 순수 TypeScript여야 해."
			]
		]
	),
	restrictImports(
		["src/shared/**/*.{ts,tsx}"],
		[
			[
				["@/app/*", "@/features/*", "@/i18n/*", "@/domain/*"],
				"shared는 도메인이나 기능을 알면 안 돼."
			]
		]
	),
	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		".next/**",
		"out/**",
		"build/**",
		"next-env.d.ts"
	])
]);

export default eslintConfig;
