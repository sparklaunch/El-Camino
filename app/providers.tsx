"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import Language from "./enums/Language";
import { useLanguageStore } from "./stores/useLanguageStore";

const htmlLang = {
	[Language.korean]: "ko",
	[Language.english]: "en",
	[Language.español]: "es",
	[Language.jammin]: "ko",
	[Language.teulttak]: "ko"
};

export default function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000,
						retry: 1
					}
				}
			})
	);
	const language = useLanguageStore((state) => state.currentLanguage);
	useEffect(() => {
		useLanguageStore.persist.rehydrate();
	}, []);
	useEffect(() => {
		document.documentElement.lang = htmlLang[language];
	}, [language]);
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
}
